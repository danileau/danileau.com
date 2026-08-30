import type { Content } from "./en";

/**
 * Deutsche Fassung. Gegen `Content` typisiert — fehlt ein Schlüssel oder
 * heisst er anders, schlägt der Build fehl, statt eine leere Stelle
 * auszuliefern.
 */
export const de: Content = {
  htmlLang: "de",
  switchTo: "Read in English",

  nav: {
    home: "Danileau — nach oben",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schliessen",
    path: "Der Weg",
    work: "Proof of Work",
    toolkit: "Querschnitt",
    education: "Bildung",
    notes: "Notizen",
    contact: "Kontakt aufnehmen",
  },

  hero: {
    role: "System-Architekt · Bern · seit 2008",
    eyebrow: "Gebaut. Betrieben. Entworfen.",
    lede1: "Seit {years} Jahren durch alle Schichten —",
    lede2: "vom ersten Commit bis zum Incident um 3 Uhr nachts.",
    lede3: "Wer's gebaut, betrieben und gepatcht hat, zeichnet keine Luftschlösser.",
    lede4: "Peak Dunning-Kruger war beim ersten Git-Push.",
    ctaContact: "Kontakt",
    ctaWork: "Projekte ansehen",
    plaque: "Jahre durch\nalle Schichten",
  },

  path: {
    kicker: "Vom Code zur Architektur",
    title: "Der Weg",
    phases: [
      {
        subtitle: "Das Fundament",
        period: "2008 – 2015",
        description:
          "Mit 16 als Lehrling bei BIT angefangen. PHP, Symfony, MySQL — Webapplikationen in der Bundesverwaltung und in der Privatwirtschaft. Wer seinen eigenen Code in Produktion sieht, lernt schnell, was \"fertig\" wirklich heisst.",
      },
      {
        subtitle: "Das Werkzeug",
        period: "2015 – 2021",
        description:
          "Docker, Kubernetes, OpenShift, Tekton, ArgoCD, Helm. CI/CD-Pipelines gebaut, nicht nur genutzt. DefectDojo mit SAST als Security-Baseline etabliert.",
      },
      {
        subtitle: "Die Realität",
        period: "2015 – 2021",
        description:
          "Parallel zum Engineering: sechs Jahre Betrieb bei BIT. Apache, Tomcat, WSO2, Linux. Pikett. Wenn die Architektur um 3 Uhr nachts hält, war sie gut.",
      },
      {
        subtitle: "Das Gesamtbild",
        period: "2021 – aktuell",
        description:
          "Lösungen und Systeme entwerfen, die funktionieren — und die Governance respektieren. TOGAF, ArchiMate, BPMN, SAFe, HERMES sind dabei Mittel, nicht Zweck.",
      },
    ],
  },

  work: {
    kicker: "Was ich baue",
    title: "Proof of Work",
    note: "Architekturentscheide teste ich, bevor ich sie empfehle.",
    professional: "Fachprojekte",
    personal: "Open Source & Privat",
    other: "Weitere Arbeiten",
    source: "Quellcode",
    live: "live",
    featured: {
      subtitle: "Zero-Knowledge Health Tracker — encrypted by design.",
      facets: [
        {
          label: "Entscheidung",
          text: "Alle Schlüssel entstehen im Browser. Der Server speichert opake Blobs und kann Gesundheitsdaten nicht lesen — auch nicht auf richterliche Anordnung, auch nicht für mich.",
        },
        {
          label: "Preis",
          text: "Ein verlorener Wiederherstellungscode bedeutet einen verlorenen Account. Es gibt keinen Reset. Wer beides verspricht, sicher und bequem, lügt bei einem von beidem.",
        },
        {
          label: "Überraschung",
          text: "Eine Betreuerin hat mir gezeigt, dass ihr Excel-Abendcheck in drei Minuten mehr leistet als mein Formular. Seither ist der Massstab nicht das Whitepaper, sondern das, was die Person sonst benutzen würde.",
        },
      ],
    },
    professionalProjects: [
      {
        title: "Infrastruktur-Datenplattform",
        description:
          "Führt IT-Infrastrukturdaten aus einem Dutzend Quellen in PostgreSQL zusammen und korreliert sie über AppID, IP, Team und Hostname. Cross-Layer-Analyse, automatisierte Abhängigkeitserkennung, Cloud-Readiness-Bewertung. Python/FastAPI, React.",
      },
      {
        title: "Repository-Analysator",
        description:
          "CLI-Tool, das die tatsächlich eingesetzte Technologie in Code-Repositories erkennt — Sprachen, Frameworks, Container, IaC. Speist die Infrastrukturplattform. Python.",
      },
      {
        title: "SBOM- & Vulnerability-Analyse",
        description:
          "Analysiert Software Bill of Materials und Container-Images auf bekannte Schwachstellen, angebunden an DefectDojo. Python/Bash.",
      },
    ],
    personalProjects: [
      {
        title: "Pretty Please Print",
        description: "",
        facets: [
          {
            label: "Entscheidung",
            text: "Kein öffentliches Sign-up. Ein Konto kann nur aus einer Einladung entstehen — erzwungen in einem einzigen Hook, durch den jedes Auth-Verfahren läuft.",
          },
          {
            label: "Preis",
            text: "Keine Mandantenfähigkeit, kein Billing, keine Warteschlangentheorie. Gebaut für fünf Leute und einen Drucker, und ehrlich darüber. AGPL, weil die Sorge Reziprozität war und nicht Umsatz.",
          },
          {
            label: "Überraschung",
            text: "Die Restore-Anleitung war aus Überlegung geschrieben, nicht aus Erfahrung. Beim ersten echten Durchlauf — Daten dazwischen gelöscht, gegen eine gepflanzte Kanarienzeile geprüft — kamen drei Dinge zum Vorschein, die im Kopf nie auftauchen. Seither ist \"dokumentiert\" kein Status.",
          },
        ],
      },
      {
        title: "Homelab",
        description:
          "Bookstack, Plex, Manyfold, Plant-Monitor auf ESP32/MQTT, Pixoo-REST. Wer Betrieb predigt, sollte ihn auch leben.",
        facets: [],
      },
    ],
    otherWork: [
      { title: "SwissCovid & Covid-Zertifikat", description: "Aufbau, Betrieb, Pikett — Bundesverwaltung 2020/21" },
      { title: "archimate-js", description: "ArchiMate-Modeler auf bpmn.io-Basis" },
      { title: "epilepc.ch", description: "Anfallstagebuch — HF-Diplomarbeit 2019, abgelöst durch ciphra" },
      { title: "Les Ateliers", description: "Webshop, Bern" },
      { title: "Couture Lui Luis", description: "Webpage & Tools, Bern" },
      { title: "Musikgesellschaft Bern-Bümpliz", description: "Webpage" },
      { title: "Lulus Leckereien", description: "IT-Support & Webpage" },
    ],
  },

  toolbox: {
    kicker: "Querschnitt",
    title: "Werkzeugkasten",
    sides: "Beilagen — im Preis inbegriffen",
    categories: [
      { title: "Methoden", items: "TOGAF ABB/SBB · ArchiMate 3.2 · BPMN 2.0 · UML 2.5 · SAFe (10+ Jahre) · HERMES (16 Jahre)" },
      { title: "Security", items: "DefectDojo · SAST/DAST · Trivy · SBOM · Argon2id · AES-256-GCM · Keycloak · Zero-Knowledge" },
      { title: "Betrieb", items: "OpenShift · Kubernetes · Docker · Tekton · ArgoCD · Helm · GitOps · Apache · Tomcat · WSO2 · Linux" },
      { title: "Stack", items: "Python/FastAPI · SvelteKit · React/TypeScript · Next.js · PHP/Symfony · PostgreSQL · MySQL" },
      { title: "IoT", items: "ESP32 · Arduino · MQTT · Sensorik · 3D-Druck" },
      { title: "Sprachen", items: "Deutsch (Muttersprache) · Italiano (madrelingua, auch zum Fluchen — skaliert besser) · English (C2) · Français (Grundlagen)" },
    ],
  },

  education: {
    kicker: "Akademischer Werdegang",
    title: "Bildung",
    note: "Beides berufsbegleitend, beides mit Auszeichnung — von der Applikationsentwicklung zur Systemarchitektur.",
    grade: "Note",
    entries: [
      { degree: "Dipl. Techniker HF Informatik", institution: "Telekommunikationsschule Bern — TSBE", period: "2017 – 2019", award: "SOHARD Preis" },
      { degree: "Informatiker EFZ", institution: "BIT — Schwerpunkt Applikationsentwicklung", period: "2008 – 2012", award: "" },
    ],
  },

  notes: {
    kicker: "Aufgeschrieben",
    title: "Notizen",
    note: "Gelegentliche Texte über Entscheidungen und darüber, was sie gekostet haben. Kein Rhythmus, kein Newsletter.",
    back: "Zurück zur Seite",
    read: "Lesen",
    backToNotes: "Alle Notizen",
  },

  footer: {
    quote: "Es ist möglich — auch wenn alles um dich herum schreit und nicht aufhört.",
    blurb: "System Architect, Engineer und Musiker. Trompete in Orchestern und Jazz-Bigbands, Snowboard im Winter, Code das ganze Jahr.",
    notes: "Notizen",
    contact: "Kontakt",
    location: "Bern, Schweiz",
    links: "Links",
    rights: "Alle Rechte vorbehalten.",
  },
};
