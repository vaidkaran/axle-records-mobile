import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_or_sign_in } from '../api/axleRecordsApi/users';

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

const googleSignIn = async (setIsSignedIn, setAuthInProgress, setUserData) => {
  const config = {
    androidClientId:
      '97966421563-vbau4nupvdunk6kpvkjbuime02f8hf4e.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    behaviour: 'web',
  };

  setAuthInProgress(true);
  const res = await Google.logInAsync(config);
  if (res.type === 'success') {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      res.idToken,
      res.accessToken
    );
    const googleProfileData = await firebase
      .auth()
      .signInWithCredential(credential);
    const idToken = await firebase.auth().currentUser.getIdToken();
    try {
      const { data } = await create_or_sign_in(idToken, { fullRes: true });
      console.log('data to set in async storage: ',data);
      // TODO: use re-usable functions like asyncStorage.setUserData to avoid typos in keys
      await AsyncStorage.setItem('@userData', JSON.stringify(data))
      setUserData(data)
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } catch (err) {
      console.log('ERROR: call to create_or_sign_in status failed!');
      console.log(`ERROR: ${err}`);
    }
    setAuthInProgress(false);
  } else {
    // TODO: ask the user that it this failed and to try again
    console.log('xxxxxx Google sign in failed xxxxxxxx');
  }
};

module.exports = {
  initFirebase,
  googleSignIn,
};
