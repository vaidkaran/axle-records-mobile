import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SignedInDrawerNavigator,
  SignedOutDrawerNavigator,
} from './navigation/drawerNavigator';
import { ActivityIndicator, View } from 'react-native';
import { initFirebase } from './helpers/auth';
import AuthContext from './context/auth';
import * as firebase from 'firebase';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authInProgress, setAuthInProgress] = useState(false);

  useEffect(() => {
    setAuthInProgress(true);
    initFirebase();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) setIsSignedIn(true);
      setAuthInProgress(false);
    });
  }, []);

  if (authInProgress) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, setAuthInProgress }}
    >
      <NavigationContainer>
        {isSignedIn ? (
          <SignedInDrawerNavigator />
        ) : (
          <SignedOutDrawerNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
