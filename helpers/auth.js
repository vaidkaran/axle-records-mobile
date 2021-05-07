import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDAP9Lg_TOzXIyDZKz6YyxCp1jV4QymM4k',
    authDomain: 'axle-records-firebase.firebaseapp.com',
    projectId: 'axle-records-firebase',
    storageBucket: 'axle-records-firebase.appspot.com',
    messagingSenderId: '726525852592',
    appId: '1:726525852592:web:2e4ecc2e9017f16fd6f475',
    measurementId: 'G-RRND72CXGS',
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

const googleSignIn = async () => {
  const config = {
    androidClientId:
      '97966421563-vbau4nupvdunk6kpvkjbuime02f8hf4e.apps.googleusercontent.com',
    clientId:
      '97966421563-ppp0d1gga9i3p5g1bmbrq0u9njmn8h8v.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    behaviour: 'web',
  };

  const res = await Google.logInAsync(config);
  if (res.type === 'success') {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credential = firebase.auth.GoogleAuthProvider.credential(
      res.idToken,
      res.accessToken
    );
    const googleProfileData = await firebase
      .auth()
      .signInWithCredential(credential);
    const idToken = await firebase.auth().currentUser.getIdToken();
    console.log('idToke is: ', idToken);
  } else {
    console.log('xxxxxx Google sign in failed xxxxxxxx');
  }
};

module.exports = {
  initFirebase,
  googleSignIn,
};
