import path from "path";

import cors from "cors";
import express, { Response, Request } from "express";
import httpProxyMiddleware from "http-proxy-middleware";
import morgan from "morgan";
import simple_oauth2 from "simple-oauth2";

import * as http from "http";

require("dotenv").config();

import { ES_URL, PORT, WWW_DIR } from "./config";

const app = express();

// Enable all CORS requests
app.use(cors());
// Logger middleware
app.use(morgan("combined"));

// TAPI connection
const TAPI_ROOT_URL = "https://topics-dev.platform.co.nl/";
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

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

const oauthClient = simple_oauth2.create(credentials);

let accessToken: String;

oauthClient.clientCredentials.getToken({}).then((result) => {
  accessToken = result.access_token;
  console.log("Access token received:", accessToken);
}).catch((error) => {
  console.log("Error getting access token for TAPI:", error);
});

function onProxyReq(
  proxyReq: http.ClientRequest, req: http.IncomingMessage, res: http.ServerResponse,
) {
  proxyReq.setHeader("Authorization", "Bearer ${accessToken}");
}

const apiProxy = httpProxyMiddleware(
  "/topics_api",
  {
    onProxyReq,
    ws: true,
    target: TAPI_ROOT_URL,
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: { "^/topics_api": "" },
  },
);
app.use(apiProxy);

// Proxy search requests
app.all("/api/*", httpProxyMiddleware({
  ws: true,
  target: ES_URL,
  changeOrigin: true,
  pathRewrite: { "^/api": "" },
  logLevel: process.env.NODE_ENV === "production" ? "info" :  "debug",
}));

// Production, serve static files
app.use(express.static(path.join(WWW_DIR)));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(WWW_DIR, "index.html"));
});

app.listen(PORT);
