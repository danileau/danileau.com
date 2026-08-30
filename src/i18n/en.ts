/**
 * English copy. This file is the shape: `de.ts` is typed against it, so a
 * missing or renamed key fails the build rather than shipping a blank.
 * Placeholders are `{name}` and are filled by `t()` in ./index.tsx.
 */
export const en = {
  htmlLang: "en",
  switchTo: "Auf Deutsch lesen",

  nav: {
    home: "Danileau — top of page",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    path: "The Path",
    work: "Proof of Work",
    toolkit: "Toolkit",
    education: "Education",
    contact: "Get in touch",
  },

  hero: {
    role: "System architect · Bern · since 2008",
    eyebrow: "Built. Operated. Designed.",
    lede1: "{years} years through every layer —",
    lede2: "from the first commit to the incident at 3 a.m.",
    lede3: "Anyone who has built it, run it and patched it doesn't draw castles in the air.",
    lede4: "Peak Dunning-Kruger was the first git push.",
    ctaContact: "Get in touch",
    ctaWork: "See the work",
    plaque: "years through\nevery layer",
  },

  path: {
    kicker: "From code to architecture",
    title: "The Path",
    phases: [
      {
        subtitle: "The Foundation",
        period: "2008 – 2015",
        description:
          "Started at BIT at sixteen, as an apprentice. PHP, Symfony, MySQL — web applications for the federal administration and in the private sector. Seeing your own code in production teaches you quickly what \"finished\" actually means.",
      },
      {
        subtitle: "The Tooling",
        period: "2015 – 2021",
        description:
          "Docker, Kubernetes, OpenShift, Tekton, ArgoCD, Helm. CI/CD pipelines built, not merely used. DefectDojo with SAST established as a security baseline.",
      },
      {
        subtitle: "The Reality",
        period: "2015 – 2021",
        description:
          "Alongside engineering: six years of operations at BIT. Apache, Tomcat, WSO2, Linux. On-call. If the architecture holds at 3 a.m., it was good.",
      },
      {
        subtitle: "The Whole Picture",
        period: "2021 – present",
        description:
          "Designing solutions and systems that work — and that respect governance. TOGAF, ArchiMate, BPMN, SAFe and HERMES are means here, not ends.",
      },
    ],
  },

  work: {
    kicker: "What I build",
    title: "Proof of Work",
    note: "I test architecture decisions before I recommend them.",
    professional: "Professional",
    personal: "Open source & personal",
    other: "Other work",
    source: "Source",
    live: "live",
    featured: {
      subtitle: "Zero-knowledge health tracker — encrypted by design.",
      facets: [
        {
          label: "Decision",
          text: "Every key is derived in the browser. The server stores opaque blobs and cannot read health data — not under a court order, and not for me.",
        },
        {
          label: "Price",
          text: "A lost recovery code is a lost account. There is no reset. Anyone promising both safe and convenient is lying about one of them.",
        },
        {
          label: "Surprise",
          text: "A caregiver showed me that her three-minute evening check in a spreadsheet outperformed my form. Since then the benchmark is not the whitepaper — it is whatever that person would otherwise use.",
        },
      ],
    },
    professionalProjects: [
      {
        title: "Infrastructure data platform",
        description:
          "Consolidates IT infrastructure data from a dozen sources into PostgreSQL and correlates it across app ID, IP, team and hostname. Cross-layer analysis, automated dependency detection, cloud-readiness assessment. Python/FastAPI, React.",
      },
      {
        title: "Repository analyser",
        description:
          "A CLI tool that detects the technology actually in use across code repositories — languages, frameworks, containers, IaC. Feeds the infrastructure platform. Python.",
      },
      {
        title: "SBOM & vulnerability analysis",
        description:
          "Analyses software bills of materials and container images for known vulnerabilities, wired into DefectDojo. Python/Bash.",
      },
    ],
    personalProjects: [
      {
        title: "Pretty Please Print",
        description: "",
        facets: [
          {
            label: "Decision",
            text: "No public sign-up. An account cannot come into existence without an invitation — enforced in a single hook that every authentication method passes through.",
          },
          {
            label: "Price",
            text: "No multi-tenancy, no billing, no queue theory. Built for five people and one printer, and honest about it. AGPL, because the worry was reciprocity and not revenue.",
          },
          {
            label: "Surprise",
            text: "The restore procedure was written from reasoning, not from experience. The first real run — data destroyed in between, checked against a planted canary row — turned up three things that never surface in your head. Since then \"documented\" is not a status.",
          },
        ],
      },
      {
        title: "Home lab",
        description:
          "Bookstack, Plex, Manyfold, a plant monitor on ESP32/MQTT, Pixoo-REST. Anyone preaching operations should also live there.",
        facets: [],
      },
    ],
    otherWork: [
      { title: "SwissCovid & Covid Certificate", description: "Build, operations, on-call — federal administration, 2020/21" },
      { title: "archimate-js", description: "ArchiMate modeller built on bpmn.io" },
      { title: "epilepc.ch", description: "Seizure diary — HF thesis 2019, succeeded by ciphra" },
      { title: "Les Ateliers", description: "Web shop, Bern" },
      { title: "Couture Lui Luis", description: "Website & tools, Bern" },
      { title: "Musikgesellschaft Bern-Bümpliz", description: "Website" },
      { title: "Lulus Leckereien", description: "IT support & website" },
    ],
  },

  toolbox: {
    kicker: "Cross-section",
    title: "The Toolbox",
    sides: "Sides — included in the price",
    categories: [
      { title: "Methods", items: "TOGAF ABB/SBB · ArchiMate 3.2 · BPMN 2.0 · UML 2.5 · SAFe (10+ yrs) · HERMES (16 yrs)" },
      { title: "Security", items: "DefectDojo · SAST/DAST · Trivy · SBOM · Argon2id · AES-256-GCM · Keycloak · zero-knowledge" },
      { title: "Operations", items: "OpenShift · Kubernetes · Docker · Tekton · ArgoCD · Helm · GitOps · Apache · Tomcat · WSO2 · Linux" },
      { title: "Stack", items: "Python/FastAPI · SvelteKit · React/TypeScript · Next.js · PHP/Symfony · PostgreSQL · MySQL" },
      { title: "IoT", items: "ESP32 · Arduino · MQTT · sensors · 3D printing" },
      { title: "Languages", items: "German (native) · Italiano (madrelingua — also for swearing, it scales better) · English (C2) · Français (basics)" },
    ],
  },

  education: {
    kicker: "Academic record",
    title: "Education",
    note: "Both part-time alongside the job, both with distinction — from application development to systems architecture.",
    grade: "Grade",
    entries: [
      { degree: "Dipl. Techniker HF, Computer Science", institution: "Telekommunikationsschule Bern — TSBE", period: "2017 – 2019", award: "SOHARD Prize" },
      { degree: "Informatiker EFZ", institution: "BIT — application development", period: "2008 – 2012", award: "" },
    ],
  },

  footer: {
    quote: "It is possible — even when everything around you is screaming and will not stop.",
    blurb: "System architect, engineer and musician. Trumpet in classical orchestras and jazz big bands, snowboard in winter, code all year.",
    contact: "Contact",
    location: "Bern, Switzerland",
    links: "Links",
    rights: "All rights reserved.",
  },
};

export type Content = typeof en;
