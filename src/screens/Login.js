import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import * as fromNotification from "../Notification";
import EStyleSheet from "react-native-extended-stylesheet";

const firebaseConfig = {
    /*
    apiKey: "AIzaSyCHuRSYZ34XPBwUC1lS8n8mUQDroo_wiW4",
    authDomain: "tritonclick.firebaseapp.com",
    databaseURL: "https://tritonclick.firebaseio.com",
    projectId: "tritonclick",
    storageBucket: "tritonclick.appspot.com",
    messagingSenderId: "612202041368",
    appId: "1:612202041368:web:c65cb675a6da23404ff36d",
    measurementId: "G-DN5HSXKVV0"
    */
    apiKey: "AIzaSyA58E91RMwqa1my-Ov_0mYg7X7FUGiDmVU",
    authDomain: "tritonclick2.firebaseapp.com",
    databaseURL: "https://tritonclick2.firebaseio.com",
    projectId: "tritonclick2",
    storageBucket: "tritonclick2.appspot.com",
    messagingSenderId: "729639828305",
    appId: "1:729639828305:web:3e3cfe797bbe7d48db7170",
    measurementId: "G-Y068K911RV"
};

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  async componentDidMount() {
    this.checkIfLoggedIn();
  }


  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('AUTH STATE CHANGED CALLED ')
        if (user) {
          var index = user.email.indexOf("@");
          var domain = user.email.substring(index + 1);
          console.log(domain);
          if(!(domain === "ucsd.edu") && !(user.email == "tritonclick.user1@gmail.com") && !(user.email == "tritonclick.user2@gmail.com")) {
            firebase.database().ref('/users/' + user.uid).remove();
            firebase.auth().signOut();
            alert("Please sign in with your UCSD email.");
          }

          this.props.navigation.navigate('Page');
		  var ref = firebase.database().ref('users/' + user.uid + '/push_token');
		  ref.once("value")
		   .then(function(snapshot) {
			 const token = snapshot.val();
			 if(token == null)
			 {
				 fromNotification.registerForPushNotificationsAsync();
			 }

		   });
          console.log('should went to homepage now');
        } else {
          this.props.navigation.navigate('Login');
          console.log('should went to login now')
        }
      }.bind(this)
    );
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {

              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {

                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    user_id: result.user.uid,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {

                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };


  signInWithGoogleAsync = async() => {
    try {
      const result = await Google.logInAsync({
        //behavior: 'web',
        androidClientId: '1068055957490-a78c8ba111ufst01ejhc584cpkr8h3k8.apps.googleusercontent.com',
        iosClientId: '1068055957490-o1gokh9v51lcqe4lsdo6q90ok1djv212.apps.googleusercontent.com',
        //webClientId: '1069243591374-19q8l8ska0dhs9ejom0okds9a7bqhkpt.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.logoText}>Triton Click</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => this.signInWithGoogleAsync()}
        >
          <Text style={styles.loginText}>Sign in with UCSD email</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center'}}>By logging in, you accepted the Terms and Conditions.</Text>
      </View>

    );
  }
}

export default Login;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: color = '#6cb0d0'
    /*
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
    */
  },

  loginButton: {
    /*
    alignItems: 'center',
    backgroundColor: '#3897f1',
    padding: 10,
    marginBottom: 20
    */
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 20,
    width: "80%",
    borderRadius: 10,
    shadowOffset: { width: 3, height: 10, },
    shadowColor: '#9A9A9A',
    shadowOpacity: 1.0,
  },

  logoText: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 50,
    textAlign: 'center',
    paddingTop: 0
  },

  loginText: {
    color: 'black',
    fontSize: 20
  }
});
