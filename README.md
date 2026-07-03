name: Build Cross Platform App

on:
  push:
    branches:
      - main
  pull_request:

jobs:

  web:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build

      - uses: actions/upload-artifact@v4
        with:
          name: web-dist
          path: dist

  android:
    runs-on: ubuntu-latest
    needs: web

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build

      - run: npm install @capacitor/core @capacitor/cli @capacitor/android

      - run: npx cap sync android

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17

      - name: Build APK
        working-directory: android
        run: ./gradlew assembleDebug

      - uses: actions/upload-artifact@v4
        with:
          name: android-apk
          path: android/app/build/outputs/apk/debug/*.apk

  ios:
    runs-on: macos-latest
    needs: web

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build

      - run: npm install @capacitor/core @capacitor/cli @capacitor/ios

      - run: npx cap sync ios

      - name: Install CocoaPods
        run: |
          cd ios/App
          pod install

      - name: Build iOS
        run: |
          xcodebuild \
          -workspace ios/App/App.xcworkspace \
          -scheme App \
          -configuration Release \
          -sdk iphoneos

      - uses: actions/upload-artifact@v4
        with:
          name: ios-build
          path: ios
