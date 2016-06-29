React Native: Beacons (iOS and Android)
======

## How to install

Assuming you already have:
- `NodeJS >= 4.1`
- `React Native` tools ([React Native website will explain better than me what it is about](https://facebook.github.io/react-native/docs/getting-started.html))
- `rnpm` (if you don't have it just: `npm install rnpm -g`*)

Steps to install:
- clone this repository
- install all npm dependencies
  ```bash
  npm install
  ```
- integrates dependencies in iOS and Android projects
```bash
rnpm link
```

## iOS:
- `react-native-ibeacon`
- iOS 8.0 minimum

> Don't forget to active Bluetooth and localization service on your device.

## Android:
- `react-native-beacons-android`
- target :
  - minimum to 21 `minSdkVersion` (*which means: android 5.0 LOLLIPOP*)

> Don't forget to active Bluetooth on your device

## Beacon:

Any beacon should work just enter the right `uuid`.

#### You have no beacon... but you have an alternate iOS device, great!

This device can become your beacon like emitter thanks to [gemtot](https://github.com/gemtot/iBeacon)

![like here :](gemtot-beacon-emitter-app.PNG)
