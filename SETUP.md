# Vocals Music Player - Setup Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

### Web (Browser)
```bash
npm run web:build
# Output: dist/ folder - Deploy to web server
```

### iOS
```bash
npm run ios:build
# Opens Xcode - Build and deploy to iOS devices
```

### Android
```bash
npm run android:build
# Opens Android Studio - Build APK/AAB
```

## Features

✅ Offline music player
✅ Metadata extraction (ID3, MP4, FLAC, WAV)
✅ Album artwork display
✅ Search & browse
✅ Favorites & recently played
✅ Shuffle & repeat modes
✅ Multi-platform support (iOS, Android, Web)

## Supported Audio Formats

- MP3 (ID3v2)
- AAC/M4A (iTunes)
- WAV (INFO chunk)
- FLAC (Vorbis)
- AIFF

## Architecture

- Domain: Business logic & entities
- Application: Services & use cases
- Infrastructure: Database & metadata parsing
- Presentation: React UI components

## Deployment

### iOS
1. Run `npm run ios:build`
2. In Xcode: Product → Archive
3. Upload to App Store Connect

### Android
1. Run `npm run android:build`
2. In Android Studio: Build → Generate Signed Bundle/APK
3. Upload to Google Play Store

### Web
1. Run `npm run web:build`
2. Deploy dist/ to your web server
3. Works on all modern browsers

## Performance

- Offline-first architecture
- IndexedDB for metadata caching
- Lazy loading components
- Optimized for large libraries (10,000+ songs)

## Privacy

✅ No internet required
✅ No data collection
✅ No analytics
✅ All data stored locally
