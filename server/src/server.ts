import path from "path";

import cors from "cors";
import express, { Response, Request } from "express";
//@ts-ignore
import {createProxyMiddleware} from "http-proxy-middleware";
import proxy from "express-http-proxy";

import morgan from "morgan";
import simpleOauth2 from "simple-oauth2";

import * as http from "http";

require("dotenv").config();

import { ES_URL, PORT, WWW_DIR } from "./config";

const app = express();

// Enable all CORS requests
app.use(cors());
// Logger middleware
app.use(morgan("combined"));

// START GLOSSARY API FUNCTIONALITY
const TAPI_ROOT_URL = "https://topics.platform.co.nl/";
const clientID = process.env.SEARCH_GLOSS_CLIENT_ID;
const clientSecret = process.env.SEARCH_GLOSS_CLIENT_SECRET;

const credentials = {
  client: {
    id: clientID,
    secret: clientSecret,
  },
  auth: {
    tokenHost: TAPI_ROOT_URL,
    tokenPath: "/o/token",
  },
};

const oauthClient = simpleOauth2.create(credentials);

let accessToken: String;

getTAPIToken();

// Indefinitely refresh the oauth token every 55 minutes
setInterval(getTAPIToken, 1000 * 60 * 55);

function getTAPIToken() {
  console.log("Refreshing TAPI access token...");
  oauthClient.clientCredentials.getToken({}).then((result) => {
    accessToken = result.access_token;
    console.log("Access token received:", accessToken);
  }).catch((error) => {
    console.log("Error getting access token for TAPI:", error);
  });
}

function onProxyReq(
  proxyReq: http.ClientRequest, req: http.IncomingMessage, res: http.ServerResponse,
) {
  proxyReq.setHeader("Authorization", `Bearer ${accessToken}`);
}

function tapiRequestFilter(pathname:any, req:any) {
  if (pathname.match("^/topics_api")) {
    if (req.method === "GET" || req.method === "OPTIONS" || req.method === "HEAD") {
      return true;
    }
  }
  return false;
}

const apiProxy = createProxyMiddleware(
  tapiRequestFilter,
  {
    onProxyReq,
    ws: true,
    target: TAPI_ROOT_URL,
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: { "^/topics_api": "" },
  },
);
// @ts-ignore createProxyMiddleware needs new types
app.use(apiProxy);

// END GLOSSARY API FUNCTIONALITY

// Proxy search requests
// @ts-ignore createProxyMiddleware needs new types
// app.all("/api/*", createProxyMiddleware({
//   ws: true,
//   target: ES_URL,
//   changeOrigin: true,
//   pathRewrite: { "^/api": "/egioensiog" },
//   logLevel: process.env.NODE_ENV === "production" ? "info" :  "debug",
//   // onProxyRes: (proxyRes, req, res) => console.log(proxyRes)
// }));

app.all("/api/*", proxy(ES_URL));

// Production, serve stat ic files
app.use(express.static(path.join(WWW_DIR)));

app.get("/", (req: Request, res: Response) => {
  // @ts-ignore createProxyMiddleware needs new types
  res.sendFile(path.join(WWW_DIR, "index.html"));
});

app.listen(PORT);
