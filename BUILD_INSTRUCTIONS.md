# KCO Global Marketplace — Android Build Instructions

## Overview
The existing KCO Global Online Marketplace website is packaged as a native Android app using Capacitor. The app loads the built web assets from within a native Android shell, giving users a native app experience while keeping all existing website features intact.

## Prerequisites
- Android Studio (latest stable)
- Java JDK 17+
- Android SDK (API 34+)
- Node.js 18+

## App Identity
- **Package Name / Application ID**: `com.kcoglobalonlinemarket.app`
- **Version Name**: `1.0.0`
- **Version Code**: `1`

## Permissions Used
| Permission | Purpose |
|---|---|
| `INTERNET` | Network access for Supabase, API calls, and website content |
| `ACCESS_NETWORK_STATE` | Detect online/offline status |
| `CAMERA` | Take photos for payment receipt uploads |
| `READ_EXTERNAL_STORAGE` (SDK ≤32) | Select receipt files from device storage |
| `READ_MEDIA_IMAGES` | Access images on Android 13+ |
| `READ_MEDIA_VIDEO` | Access videos on Android 13+ |
| `POST_NOTIFICATIONS` | Push notifications (Android 13+) |
| `VIBRATE` | Haptic feedback on interactions |

## Build Steps

### 1. Build the web assets
```bash
npm run build
```

### 2. Sync web assets to the Android project
```bash
npx cap copy android
npx cap sync android
```

### 3. Open in Android Studio
```bash
npx cap open android
```

### 4. Generate a signing keystore (one-time)
```bash
keytool -genkey -v -keystore android/kco-release.keystore -alias kco-release -keyalg RSA -keysize 2048 -validity 10000
```

### 5. Create keystore.properties
Copy `android/keystore.properties.example` to `android/keystore.properties` and fill in your keystore details.

### 6. Build the signed AAB
In Android Studio:
- **Build → Generate Signed Bundle / APK → Android App Bundle**
- Select your keystore, enter passwords
- Select the `release` build variant
- Click **Finish**

Or from the command line:
```bash
cd android
./gradlew bundleRelease
```

The signed AAB will be at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### 7. Verify the AAB
```bash
# Check the bundle is valid
bundletool build-apks --bundle=app-release.aab --output=app.apks --mode=universal
# Install on a connected device for testing
bundletool install-apks --apks=app.apks
```

## Deep Links
The app registers deep links for:
- `https://kcoglobalonlinemarket.com` — all website URLs
- `kco://marketplace` — custom app scheme

## Features Supported in Android App
- Secure login persistence (Supabase Auth + Capacitor Preferences)
- Camera access (receipt photo capture)
- Image and file uploads (receipts, avatars)
- Push notifications (Firebase Cloud Messaging)
- Deep links (open specific pages from URLs)
- Payment integration (Flutterwave + manual bank transfer)
- AI assistant features (admin + customer AI widgets)
- Offline handling (network state detection)
- Responsive layout for phones and tablets

## Google Play Submission Checklist
- [ ] AAB is signed with a release keystore
- [ ] Version code incremented from previous upload
- [ ] App icon and splash screen configured
- [ ] Privacy policy URL set in Play Console
- [ ] Target API level meets Google Play requirements (API 34+)
- [ ] Data safety form completed in Play Console
- [ ] Content rating questionnaire completed
- [ ] Store listing (screenshots, description, feature graphic) prepared

## Build Commands Summary
| Step | Command |
|---|---|
| Install dependencies | `npm install` |
| Build web assets | `npm run build` |
| Sync to Android | `npx cap sync android` |
| Open Android Studio | `npx cap open android` |
| Build AAB (CLI) | `cd android && ./gradlew bundleRelease` |
