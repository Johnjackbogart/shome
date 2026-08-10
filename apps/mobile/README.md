# @shome/mobile

The shome iOS/Android app (Expo + expo-router + NativeWind). A thin client of
`apps/web`'s API — same accounts, same feed.

```sh
npm run dev          # from the repo root: the web server the app talks to
npm run dev:mobile   # Metro dev server; press i / a, or scan the QR in Expo Go
```

In dev the app finds the web server via the Metro host (port 3000 on the same
machine). Point it elsewhere with `EXPO_PUBLIC_API_URL` in `apps/mobile/.env`.

See the [repo README](../../README.md) and
[architecture doc](../../docs/architecture.md) for the full picture.
