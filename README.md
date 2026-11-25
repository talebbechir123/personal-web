# atbechir.com — Personal Portfolio

Source code of my portfolio site, [atbechir.com](https://atbechir.com): projects, experience, education, technical writing and downloadable reports.

The site is a React + TypeScript single-page app served by a minimal Express server, packaged as one container and deployed to Google Cloud Run through Cloud Build.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Server | Node.js 20, Express (static hosting, SPA fallback, `/healthz`) |
| Container | Multi-stage Docker build (`node:20-alpine`) |
| CI/CD | Google Cloud Build → Artifact Registry → Cloud Run |

## Repository layout

```
.
├── client/              React app (Vite)
│   ├── src/
│   │   ├── App.tsx      Page sections: hero, projects, expertise, experience, education, writing
│   │   ├── data.ts      All site content in one typed file
│   │   └── components/  Visual components and icons
│   └── public/          CV and project reports (PDF)
├── server/
│   └── index.js         Express server: serves the built client and a health endpoint
├── Dockerfile           Build stage (client) + runtime stage (server only)
├── cloudbuild.yaml      Build, push and deploy pipeline
└── Makefile             deploy / logs / url shortcuts
```

The Vite build writes directly into `server/public`, so the runtime image contains only the server and the static bundle.

## Run locally

```bash
npm run install:all   # installs root, client and server dependencies
npm run dev           # client on :3001 (Vite), server on :3000
```

Production build:

```bash
npm run build         # builds client into server/public
npm start             # serves it on :3000
```

## Deploy

```bash
cp .env.example .env  # set GCP_PROJECT, GCP_REGION, SERVICE_NAME
make deploy           # Cloud Build: docker build → push → gcloud run deploy
make url              # print the service URL
make logs             # tail Cloud Run logs
```

Cloud Run is configured with 256 MiB, 1 vCPU and scale-to-zero (`min-instances=0`, `max-instances=3`). One-time setup commands for Artifact Registry are documented at the top of `cloudbuild.yaml`.

## Author

**Ahmed Taleb Bechir** — HPC & cloud engineer
[atbechir.com](https://atbechir.com) · [LinkedIn](https://www.linkedin.com/in/ahmed-taleb-bechir-97a7301a4) · [Substack](https://atalebbechir.substack.com) · talebbechir123@gmail.com
