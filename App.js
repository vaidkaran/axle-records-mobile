import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SignedOutDrawerNavigator } from './navigation/drawerNavigator';
import { initFirebase } from './helpers/auth';

export default function App() {
  initFirebase();

  return (
    <NavigationContainer>
      <SignedOutDrawerNavigator />
    </NavigationContainer>
  );
}
