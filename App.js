import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from './styles'
import { NavigationContainer } from '@react-navigation/native';
import Signin from './screens/signin';
import {SignedOutDrawerNavigator} from './navigation/drawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SignedOutDrawerNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
