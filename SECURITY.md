# Security

## Supported version

Security fixes are applied to the latest commit on `main`. Run the application
with Node.js 24 LTS and install dependencies from `package-lock.json` using
`npm ci`.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Use GitHub's private
security advisory reporting for this repository and include:

- The affected route or file.
- Reproduction steps or a minimal proof of concept.
- Expected impact and any known workaround.

## Current security boundary

Tech en 60 is a client-focused learning tool. It has no accounts, backend API,
database, analytics, cookies, uploads, or user-provided HTML. Browser storage
contains only the selected category and concept name and is treated as stale,
untrusted input when restored.

If server routes, Server Actions, authentication, or external data are added,
they require a new threat review covering input validation, authorization,
secrets, rate limiting, logging, and data minimization.
