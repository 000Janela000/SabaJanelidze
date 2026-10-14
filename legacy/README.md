# legacy/

Code from the old site that the new site does not use yet.

- `api-contact.ts`: the old contact-form backend (a Vercel serverless function that sends email through Resend).
  It is kept only so its input checks, honeypot and HTML escaping can be ported to a Cloudflare Worker route
  (`POST /api/contact`) in a later phase. Nothing imports it, and the build ignores this folder.
