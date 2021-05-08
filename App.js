import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SignedInDrawerNavigator,
  SignedOutDrawerNavigator,
} from './navigation/drawerNavigator';
import { initFirebase } from './helpers/auth';
import AuthContext from './context/auth';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  initFirebase();

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <NavigationContainer>
        {isSignedIn ? (
          <>
            <SignedInDrawerNavigator />
          </>
        ) : (
          <>
            <SignedOutDrawerNavigator />
          </>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
