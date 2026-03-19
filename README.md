# Svelte library

Everything you need to build a Svelte library, powered by [`sv`](https://npmjs.com/package/sv).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.12.8 create --template library --types ts --add tailwindcss="plugins:forms" prettier --install npm elmoradar-website-new
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## API endpoints

This project now includes two server endpoints:

- `GET /api/vatsim/status`
- `GET /api/twitch/status`

### VATSIM status

Endpoint:

```text
GET /api/vatsim/status
```

Optional query params:

- `callsign` (default: `EDDB_DEP`)

Examples:

```text
/api/vatsim/status
/api/vatsim/status?callsign=DLH123
```

Response fields include:

- `connected`
- `callsign`
- `route`
- `altitude`
- `onlinePilots`
- `onlineControllers`
- `lastUpdated`

### Twitch status

Endpoint:

```text
GET /api/twitch/status
```

Optional query params:

- `channel` (default: `elmoradar`)

Examples:

```text
/api/twitch/status
/api/twitch/status?channel=elmoradar
```

Response fields include:

- `configured`
- `live`
- `channel`
- `title`
- `viewers`
- `game`
- `startedAt`
- `url`
- `lastUpdated`

## Twitch setup

The Twitch endpoint needs app credentials.

1. Copy `.env.example` to `.env`.
2. Add your values:

```text
TWITCH_CLIENT_ID=...
TWITCH_APP_ACCESS_TOKEN=...
```

To get an app access token, run this (replace placeholders):

```bash
curl -X POST "https://id.twitch.tv/oauth2/token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=client_credentials"
```

Use `access_token` from the response as `TWITCH_APP_ACCESS_TOKEN`.

## Building

To build your library:

```sh
npm pack
```

To create a production version of your showcase app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```sh
npm publish
```
