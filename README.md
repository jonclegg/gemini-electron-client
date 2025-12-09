# Gemini Electron Client

A native macOS desktop application that wraps Google Gemini in an Electron shell.

## Features

- Native macOS app experience for Google Gemini
- Keeps you signed in with persistent sessions
- External links open in your default browser
- Google authentication handled seamlessly
- Code signed and notarized for macOS

## Download

Download the latest DMG from the [Releases](https://github.com/jonclegg/gemini-electron-client/releases) page:
- `Gemini Client-x.x.x.dmg` - Intel Macs (x64)
- `Gemini Client-x.x.x-arm64.dmg` - Apple Silicon Macs (M1/M2/M3)

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
```

### Run in Development

```bash
npm start
```

### Build

Copy `build.sh.example` to `build.sh` and fill in your Apple Developer credentials for code signing and notarization:

```bash
cp build.sh.example build.sh
# Edit build.sh with your credentials
./build.sh
```

The built DMGs will be in the `dist/` folder.

## License

ISC

