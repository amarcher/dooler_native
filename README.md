# Dooler Native
React Native Client for the Dooler App

## Running locally:
After cloning the repository and `cd`-ing into it, follow the instructions on [FB's Getting Started with React Native](http://facebook.github.io/react-native/docs/getting-started.html).

1. Install XCode
2. Install dependencies in six steps
```bash
npm install
npm install -g create-react-native-app
npm install -g react-native-cli
react-native link react-native-splash-screen
react-native install react-native-fbsdk
react-native link react-native-fbsdk
```

3. Download and link the Facebook SDK as advised at https://github.com/facebook/react-native-fbsdk#32-ios-project

4. Run the simulator -OR- Open the `ios/Dooler.xcodeproj` and build & run it from within Xcode

```bash
react-native run-ios
```

## Preparing a build for TestFlight:

1. In Xcode, increment the build number by clicking on the Dooler project and on the Dooler target.
2. Create an archive in Xcode *Product* > *Archive*
3. Select the archive in the resulting modal and click *Upload to iTunes Connect*
4. Agree to all the defaults (allow automatic code signing)
5. Go to https://itunesconnect.apple.com click Apps > TestFlight
6. Wait for the build to finish processing, then click on *Missing Compliance Export* and confirm nothing has changed
7. Click *Start Testing* -- this will send a notification to all our TestFlight testers that a new version is available for download.
