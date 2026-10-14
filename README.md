Delta Greenery

## Delta Green rights and publishing license

Delta Green is a trademark and copyright of the **Delta Green Partnership**. Read the [official publishing guidelines](https://www.delta-green.com/publishing-guidelines/) before distributing your work. The guidelines govern use of Delta Green intellectual property; the repository's source-code license does not grant rights to that property.

Use **License > Delta Green > Recognition of Rights (first page)** in either renderer to insert the required notice. Replace `[AUTHOR NAME]` with your author name and place it on the **first page** of a PDF or text publication. The notice is also required on each applicable web page; the official guidelines explain placement for audio and video. The automatic Arc Dream Publishing disclaimer is separate and does not replace this notice.

> Published by arrangement with the Delta Green Partnership. The intellectual property known as Delta Green is a trademark and copyright owned by the Delta Green Partnership, who has licensed its use here. The contents of this document are ©[AUTHOR NAME], excepting those elements that are components of the Delta Green intellectual property.

**License > Delta Green > Publishing Guidelines** inserts a link and a summary. Noncommercial material must be free to access; paid subscriptions, fundraising, sales and pay-what-you-want distribution are not permitted under the general permission. Commercial use requires separate written permission. Do not use the official logo or official trade dress, and follow the guidelines' title rules.

The guidelines exclude AI-created material, republications, translations, original fiction, and apps or other executables. They describe allowed original game material and actual plays, with a limited commercial exception for subscriber-funded actual-play and discussion podcasts. Consult the linked policy for the complete conditions: adding the notice is not, by itself, permission for an otherwise excluded use.

This repository is a fork of [the Homebrewery](https://homebrewery.naturalcrit.com/) by the wonderful folks at Natural Crit, adapted to produce documents for [Arc Dreams' Delta Green](https://arcdream.com/home/category/delta-green/) Roleplaying Game. The goal is to be able to produce semi-authentic looking pdf's that emulate the style of the official Delta Green material, for purposes such as adventure creation and thus empower homebrew creations for its users. For a preview see here:

<img width="2527" height="1207" alt="image" src="https://github.com/user-attachments/assets/c30e49dd-ea1e-4639-920a-ad39ee2c6dba" />


## Static website

The default build is now a frontend-only editor. Deploy the contents of `dist/` to a static host. Builds default to the domain root; `BASE_PATH=/deltagreenery` supports repository subpaths. There is no application server, MongoDB, site account, or document upload to the host. The older server source remains for reference and is excluded from the deployed output.

### Run locally

With Docker Desktop running:

```sh
docker compose up --build
```

Open http://localhost:8000. Docker serves static files using nginx. No database is started. Existing MongoDB volumes are not deleted or automatically migrated; export any older documents as Markdown before retiring the old installation.

For development with Node 20.18+:

```sh
npm ci
npm start
```

`npm ci` builds the site. After code changes, run `npm run build` and refresh. `npm run dev` builds and starts the preview. The local Node preview only serves files; it is not part of the deployed website. Do not run the old `run-deltagreenery.bat` updater: it resets the checkout to master.

### Storage

Changes save automatically in browser localStorage, separately for each draft and site origin. Clearing site data removes these copies. Download Markdown for portable backups; importing preserves content, custom CSS, snippets and document properties. The Google connection is optional. Without it, editing and PDF printing still work.

Connect Google Drive, choose your own Google account, then use **Save to my Drive**. Files are ordinary `.md` files in that user's Drive and are private by default. **Open from Drive** lists files created by this application. To use existing Markdown files, download them from Drive and import them, then save a new Drive copy. Saving is explicit; browser drafts autosave. Switching accounts creates a new file in the new account instead of overwriting another account's file. Detected external edits require opening the latest version or saving a new copy.

Access tokens exist only in memory. Refreshing the page or expiration requires reconnecting; no token or client secret is stored in browser drafts. Disconnect ends the local session; access can also be revoked in the user's Google account settings. Drive metadata is retained with browser drafts so the right file can be updated after reconnecting.

There are no server-backed public share links, accounts, or MongoDB saves in the static app. Share downloaded Markdown/PDF files using your own storage. Remote images and Google services still make requests to their respective providers.

### Google configuration

The public OAuth client ID is in `static/config.js`. A client ID is not a secret. Never add a client secret. In the same Google Cloud project:

1. Enable the Google Drive API.
2. Configure the Google OAuth consent screen. If its audience is in Testing, add the intended Google accounts as test users.
3. Use a **Web application** OAuth client. Add `http://localhost:8000` to **Authorized JavaScript origins** for local testing, and the exact production HTTPS origin when hosting is selected. Origins have no path. Using 127.0.0.1 or another port requires its own authorized origin.
4. The application uses Google Identity Services' browser token flow with the limited `drive.file` scope. No backend OAuth callback or client secret is needed.
5. Rebuild after changing `static/config.js`, then redeploy `dist/`. Configuration and entry assets use content-hashed filenames to avoid stale cached releases.

See Google's [browser token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model) and [Drive authorization scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth). Real authorization requires your Google Cloud settings; automated tests use mocked Google responses.

### Code structure

- `client/static/App.jsx`: frontend entry, document selection and storage actions.
- `client/static/draftStore.js`: browser persistence and stale-edit detection.
- `client/static/googleDrive.js`: direct browser-to-Drive OAuth and Markdown file requests.
- `client/static/documentFormat.js`: portable Markdown metadata/CSS format.
- `client/static/themeBundle.js`: local theme inheritance, replacing the theme API.
- `client/homebrew/editor/`: shared CodeMirror editor and preserved DG snippet buttons.
- `client/homebrew/brewRenderer/`: preview, pagination, printing and Arc Dream Publishing disclaimer.
- `themes/`: Delta Green styles, fonts and assets.
- `scripts/buildStatic.js`: static assets and browser bundle into `dist/`.
- `static/`: HTML bootstrap, public configuration and nginx configuration.

Run `npm run test:static` for storage and Drive regression tests. All generated pages retain the Arc Dream Publishing disclaimer.

### GitHub Pages

The workflow in `.github/workflows/pages.yml` builds and deploys **only `development-branch`**. `master` remains the MongoDB/local version with the disclaimer. No third branch is needed; Actions uploads `dist/` as a Pages artifact.

1. In this repository's **Settings > Pages**, select **GitHub Actions** as the build source.
2. Under **Settings > Environments > github-pages**, ensure deployment branch rules allow `development-branch`.
3. Push the website and Pages workflow to `development-branch`. Subsequent pushes deploy automatically. Inspect **Actions > Deploy public website** for the result. The workflow is deliberately absent from `master`; the manual Run workflow button may not appear until a workflow exists on the default branch, so use a push to trigger it.
4. Without a custom domain, the expected address is `https://berlinia.github.io/deltagreenery/`. The workflow obtains the actual base path from GitHub, including when a custom domain is configured later.
5. Add **`https://berlinia.github.io`** to the Google OAuth client's authorized JavaScript origins. Do not include `/deltagreenery/`. Keep the localhost origin for local testing.

Google connections and browser drafts remain client-side. Browser drafts at localhost do not appear on GitHub Pages; export/import Markdown or use Drive to transfer them. Browser storage is scoped to the origin, so other repositories under the same GitHub Pages account share that storage boundary.

To preview the repository path locally in PowerShell:

```powershell
$env:BASE_PATH = '/deltagreenery'
npm run build
npm start
```

Then open `http://localhost:8000/deltagreenery/`. Clear `BASE_PATH` and rebuild to return to the default root preview.

The homepage always opens the built-in guide, including for returning users. Select a browser draft to resume editing. **Home / Guide** returns to the guide without creating extra drafts; editing the guide saves a separate local copy.

## Optional visitor analytics (public website)

Set `googleAnalyticsId` in `static/config.js` to the GA4 web stream Measurement ID (`G-...`). Leave it empty to disable analytics and the consent prompt. This is a public identifier, not a secret. The integration belongs only to the frontend deployment branch.

Before enabling the ID, configure the web stream in Google Analytics:

- Turn **Enhanced measurement off**, including page changes, form interactions, site search, outbound links and file downloads. The editor contains private user content; only the configured site visit should be measured.
- Leave Google Signals, user-provided data collection and advertising integrations disabled. Do not add document fields or Google Drive account data as events or user properties.
- Set event-data retention to **2 months** and review your property's data-sharing settings.

Deploy, then open the site and choose **Allow analytics**. Check Analytics **Realtime** for the visit (ad blockers may prevent collection). No Analytics script or request is sent before consent or after a fresh-page decline. Visitors can withdraw through **Analytics preferences**; this disables the tag and clears the app's host-scoped analytics cookies. Consent choices and cookies last up to 180 days. Counts therefore represent consenting, unblocked visitors, not every visit. Draft storage and Google Drive authorization are independent of analytics consent.
