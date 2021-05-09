import React from 'react';
import About from '../screens/about';
import Home from '../screens/home';
import Signin from '../screens/signin';
import Signout from '../screens/signout';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../styles';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const SignedInDrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: Colors.lightGrey },
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Drawer.Screen name="About" component={About} />
    <Drawer.Screen name="SignOut" component={Signout} />
  </Drawer.Navigator>
);

const SignedOutDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Signin">
    <Drawer.Screen name="Signin" component={Signin} />
  </Drawer.Navigator>
);

export { SignedInDrawerNavigator, SignedOutDrawerNavigator };
