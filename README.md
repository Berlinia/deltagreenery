Delta Greenery

This repository is a fork of [the Homebrewery](https://homebrewery.naturalcrit.com/) by the wonderful folks at Natural Crit, adapted to produce documents for [Arc Dreams' Delta Green](https://arcdream.com/home/category/delta-green/) Roleplaying Game. The goal is to be able to produce semi-authentic looking pdf's that emulate the style of the official Delta Green material, for purposes such as adventure creation and thus empower homebrew creations for its users. For a preview see here:

<img width="2527" height="1207" alt="image" src="https://github.com/user-attachments/assets/c30e49dd-ea1e-4639-920a-ad39ee2c6dba" />


## Static website

The default build is now a frontend-only editor. Deploy the contents of `dist/` to a static host at the domain root. There is no application server, MongoDB, site account, or document upload to the host. The older server source remains for reference and is excluded from the deployed output.

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
5. Rebuild after changing `static/config.js`, or update the public `dist/config.js` on the deployed host.

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
