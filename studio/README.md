# The Palms — Sanity Studio (editor)

This is the admin the client logs into to edit photos and the therapist roster.

## First-time setup
1. `cd studio`
2. `npm install`
3. `npx sanity login`   (email or Google)
4. `npx sanity init --reconfigure`  → choose/create the project, dataset `production`
   (or set SANITY_STUDIO_PROJECT_ID and put the projectId in sanity.config.ts)
5. `npm run deploy` → publishes the editor at https://<your-name>.sanity.studio

## Inviting the client
Sanity → Manage → Members → Invite. Give them the **Editor** role.
They log in at the .sanity.studio URL with email/Google — no GitHub needed.
