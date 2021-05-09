import React from 'react';
import { About, Home, Signin, Signout, AddVehicle } from '../screens';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../styles';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const HomeStackNavigator = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="AddVehicle" component={AddVehicle} />
  </HomeStack.Navigator>
);

const SignedInDrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{
      // headerShown: true,
      headerStyle: { backgroundColor: Colors.lightGrey },
    }}
  >
    <Drawer.Screen name="Home" component={HomeStackNavigator} />
    <Drawer.Screen name="About" options={{headerShown: true}} component={About} />
    <Drawer.Screen name="SignOut" component={Signout} />
  </Drawer.Navigator>
);

const SignedOutDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Signin">
    <Drawer.Screen name="Signin" component={Signin} />
  </Drawer.Navigator>
);

export { SignedInDrawerNavigator, SignedOutDrawerNavigator };
