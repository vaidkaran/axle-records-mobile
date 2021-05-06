import React from 'react';
import About from '../screens/about';
import Home from '../screens/home';
import Signin from '../screens/signin';
import Signout from '../screens/signout';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const SignedInDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="About" component={About} />
    <Drawer.Screen name="SignOut" component={Signout} />
  </Drawer.Navigator>
);

const SignedOutDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Signin">
    <Drawer.Screen name="Signin" component={Signin} />
    <Drawer.Screen name="About" component={About} />
  </Drawer.Navigator>
);

export { SignedInDrawerNavigator, SignedOutDrawerNavigator };
