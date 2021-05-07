const googleConfig = {
  androidClientId:
    '97966421563-vbau4nupvdunk6kpvkjbuime02f8hf4e.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  behaviour: 'web',
};

const firebaseConfig = {
  apiKey: 'AIzaSyDAP9Lg_TOzXIyDZKz6YyxCp1jV4QymM4k',
  authDomain: 'axle-records-firebase.firebaseapp.com',
  projectId: 'axle-records-firebase',
  storageBucket: 'axle-records-firebase.appspot.com',
  messagingSenderId: '726525852592',
  appId: '1:726525852592:web:2e4ecc2e9017f16fd6f475',
  measurementId: 'G-RRND72CXGS',
};

module.exports = {
  googleConfig,
  firebaseConfig,
};
