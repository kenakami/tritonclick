# tritonclick
npm i -S react-native-simple-dialogs<br />
Install the following libraries to use Login.js:<br />
npm install firebase<br />
expo install expo-google-app-auth<br />
To fix the warning issue after loggin in, here are the steps:<br />
1. Go to node_modules/react-native/Libraries/Core/Timer/JSTimers.js<br />
2. Look for the variable MAX_TIMER_DURATION_MS<br />
3. Change 60 * 1000 to 10000 * 1000<br />
4. Save the changes and re-build the app.
