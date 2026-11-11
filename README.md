# Keycloak and Microsoft Entra ID SAML lab

Indonesian L400 guide: Microsoft Entra ID is the SAML identity provider, Keycloak is the service provider/broker, and an OIDC claims viewer runs on the laptop with Docker Compose.

The guide preserves the five sub-pages and visual style of the existing CMP portal. It includes a video explanation, deployment instructions, Entra and Keycloak configuration, troubleshooting, and 17 real screenshots with numbered highlights and redacted identifiers.

## Pages

| File in `docs/` | Content |
|---|---|
| `index.html`, `saml-lab.html` | Video explanation, architecture, trust direction and L400 findings |
| `saml-lab-docker.html` | Laptop Docker Compose deployment |
| `saml-lab-entra.html` | Entra SAML Enterprise App and role assignment |
| `saml-lab-keycloak.html` | Keycloak broker, validation, mappers and JIT users |
| `saml-lab-test.html` | Login paths, evidence, SAML messages, troubleshooting and hardening |

## Publication boundary

This repository contains **static documentation only**. GitHub Pages does not run Keycloak, Docker, the identity-management API or a login service.

The application source, Compose files and configuration scripts remain in the [private source repository](https://github.com/benyibrani_microsoft/cmp-azure-identity-lab/tree/main/labs/saml-entra-keycloak). Access to that repository is required to run those scripts. Requirements documents, raw authentication captures, personal identifiers and local secrets are not included here.

The live lab recorded a successful Entra-to-Keycloak SAML login on 11 November 2026. This is not a demonstration of a local Keycloak user signing into Azure. Entra single logout was not tested. The video explanation is based on available descriptive material, not a retrieved transcript.

## Publishing updates

GitHub Pages publishes the **`main` branch, `/docs` folder**. The empty `docs/.nojekyll` keeps the site as plain HTML. A push to `main` automatically triggers GitHub's Pages build and deployment.

In the private source repository, run:

```powershell
node --test tests\pages.test.mjs tests\frontend.test.mjs
npm run build:pages
```

The build produces `.pages-dist/` from an explicit allowlist of five guide pages, their 17 screenshots, shared CSS and navigation, a root landing page, and `.nojekyll`. It excludes the rest of the portal. Review any new text and screenshot pixels before publication, copy the generated files into this repository's `docs/`, then commit and push. Never copy the whole private repository or the whole `public/` directory.
