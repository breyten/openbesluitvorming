import * as React from "react";
import paths from "../paths";
import { TITLE, IS_ORI } from "../config";
import { poweredBy, OrgType } from "../poweredBy";
import { colors } from "../sharedStyles";

interface AppType {
  name: string;
  description: string;
  url: string;
}

const otherApps: AppType[] = [
  {
    name: "Raadstalk",
    description: "Bekijk trends in wat gemeenten bespreken.",
    url: "https://www.vngrealisatie.nl/producten/raadstalk",
  },
  {
    name: "WaarOverheid",
    description: "Open Raadsinformatie op de kaart.",
    url: "https://waaroverheid.nl",
  },
  {
    name: "1848.nl",
    description: "Volg thema's die worden besproken en ontvang meldingen.",
    url: "https://1848.nl",
  },
  {
    name: "Voordat het nieuws was",
    description: "Zoek stukken van de raad en staten bij het laatste nieuws",
    url: "https://www.voordathetnieuwswas.nl/",
  },
]

const Home = () => {
  React.useEffect(() => {
    document.title = TITLE
  }, []);

  return (
    <div className="Home">
      <div className="Home__wrapper">
        <h1 className="Home__header">Doorzoek vergaderstukken van gemeenten en provincies</h1>
        <p>
          Met deze app zoek je door de openbare vergaderingen, agendapunten, moties en
          documenten van meer dan 130 deelnemende gemeenten en zes provincies.
        </p>
        {IS_ORI ?
          <div>
            <p>
              Open Raadsinformatie is een initiatief om de besluitvorming van Nederlandse gemeenten
              transparanter te maken.
              Dit wordt gedaan door automatisch uit de bestaande vergadersoftware
              (raadsinformatiesystemen) de vergaderingen en documenten te halen en
              deze vervolgens middels een API te ontsluiten op een gestandaardiseerde manier.
            </p>
            <h2>Door wie</h2>
            <p>
              Vanuit het <a href={paths.actieplan}>actieplan open overheid</a>{" "}
              werkt <a href={paths.vngRealisatie}>VNG Realisatie</a> in samenwerking met
              de <a href={paths.openstate}>Open State Foundation</a> aan
              het openstellen van besluitvorming van gemeenten en provincies als open data.
              Lees <a href={paths.vngProject}>hier</a> meer over het project.
            </p>
            <p>
              De techniek is gemaakt
              door <a href={paths.ontola}>Ontola</a>; het ontwikkelteam
              achter <a href={paths.argu}>Argu</a>.
              De broncode van zowel deze <a href={paths.oriSearchGithub}>zoekmachine</a> als
              de <a href={paths.oriBackEndGithub}>server</a> van {TITLE} zijn
              open source beschikbaar op Github.
            </p>
          </div>
          :
          <div>
            <p>
              OpenBesluitvorming.nl is een initiatief van <a href={paths.argu}>Argu</a> om
              data van gemeenten, provincies en andere overheden samen te brengen in
              één zoekomgeving.
              Zowel deze <a href={paths.oriSearchGithub}>zoekmachine</a> als
              de <a href={paths.oriBackEndGithub}>server</a> zijn open source.
            </p>
            <p>
              Vanuit het <a href={paths.actieplan}>actieplan open overheid</a> werkt
              het Ministerie van Binnenlandse Zaken aan het transparanter maken van overheden.
              Actiepunt 1 uit dit plan is het openen van besluitvormingsdata.
              De <a href={paths.openstate}>Open State Foundation</a> is samen
              met <a href={paths.vngRealisatie}>VNG Realisatie</a> het
              project <a href={paths.vngProject}>Open Raadsinformatie</a> gestart om data
              uit gemeenteraden te verzamelen.
              Voor de provincies is Open Stateninformatie gestart.
            </p>
            <p>
              Argu heeft als missie om besluitvorming zo open en toegankelijk mogelijk te maken
              en raakte zo als betrokken bij deze projecten.
              In de toekomst willen we ook data van waterschappen en de Tweede Kamer toevoegen.
            </p>
          </div>
        }
        <h2>Jouw gemeente of provincie toevoegen</h2>
        <p>
          Als je wil dat ook jouw gemeente aangesloten wordt op Open Raadsinformatie,
          vraag dan de griffie van je gemeenteraad <a href={paths.vngNewForm}>dit formulier</a> in te vullen.
          {IS_ORI ? null :
            <span> Provincies of andere overheden kunnen mailen naar <a href={paths.arguMail}>joep@argu.co</a>.</span>
          }
        </p>
        <h2>Andere apps</h2>
        <ul>
          {otherApps.map((app: AppType) => (
            <li key={app.name}>
              <a href={app.url}>{app.name}</a>
              : <span>{app.description}</span>
            </li>
          ))}
          <li>Jouw app hier? <a href={paths.appList}>Dien een PR in!</a></li>
        </ul>
        <h2>Open data hergebruiken</h2>
        <p>
          Als je zelf ook gebruik wil maken van deze data, lees dan
          de <a href={paths.apiDocs}>documentatie</a>.
        </p>
        <h2>Contact</h2>
        <p>
          Technische vragen of suggesties over de API kunnen op
          de <a href={paths.oriBackEndGithub}>issue tracker van de server</a> geplaatst worden.
        </p>
        <p>
          Voor suggesties, problemen of vragen over deze zoekmachine,
          plaats een issue op <a href={paths.oriSearchGithub}>de ori-search issue tracker</a>.
        </p>
        {IS_ORI ? null : <p>
          Voor algemene vragen kunt u mailen naar <a href={paths.arguMail}>Joep Meindertsma</a>.
        </p>}
        <h2>Privacy</h2>
        <p>
          We gebruiken Matomo (een privacy-vriendelijk alternatief voor Google analytics) om bezoekersstatistieken te verzamelen.
          We gebruiken deze gegevens alleen om anonieme rapportages te maken van bezoekers, en verkopen deze data aan niemand door.
          We slaan de laatste zes getallen van IP adressen niet op om jouw privacy te beschermen.
        </p>
        <h2>Disclaimer</h2>
        <p>
          De data in deze zoekmachine komt uit Open Raadsinformatie en Open Stateninformatie.
          Deze data is met toestemming van de deelnemende gemeenten en provincies geïmporteerd uit diverse vergadersystemen.
          De data kan door het importeren incompleet, onjuist of niet up to date zijn.
          Het eigenaarschap van de data ligt bij de organisaties die de data hebben aangemaakt, of de respectievelijke auteurs van de documenten.
        </p>
        {IS_ORI ? null :
          <p>
            OpenBesluitvorming.nl is tot stand gekomen door de tijd en moeite van de onderstaande organisaties.
            Hover met je muis over de logo&apos;s om te zien wat hoe de organisaties hebben bijgedragen, en klik er op om er meer over te lezen.
          </p>
        }
      </div>
      {IS_ORI ? null :
        <div
          style={{
            backgroundColor: 'white',
            padding: "1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
            flexWrap: "wrap",
            borderTop: "solid 1px",
            borderTopColor: colors.g2,
          }}
        >
          {poweredBy.map((org: OrgType) => (
            <a
              href={org.url}
              key={org.name}
              title={org.toelichting ? `${org.name}: ${org.toelichting}` : org.name}
              style={{
                display: 'flex',
                margin: '1rem',
              }}
            >
              <img
                src={`/orglogos/${org.picture}`}
                alt={org.name}
                style={{
                  minWidth: '2rem',
                  maxWidth: '5rem',
                  maxHeight: '5rem',
                  width: '100%',
                  height: '100%',
                }}
              />
            </a>
          ))}
        </div>
      }
    </div>
  );
};

export default Home;
