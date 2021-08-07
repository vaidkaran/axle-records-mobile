import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { About, Home, Signin, Signout, AddVehicle } from '../screens';
import {
  CustomerHomeStack,
  VendorHomeStack,
  SelectSiteRoleStack,
} from './stackNavigator';
import AuthContext from '../context/auth';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../styles';

const Drawer = createDrawerNavigator();
// const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  const { userData } = useContext(AuthContext);
  if (!userData) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (!userData.site_role_id) {
    return <SelectSiteRoleStack/>;
  } else if (userData.site_role.name === 'vendor') {
    return <VendorHomeStack/>;
  } else if (userData.site_role.name === 'customer') {
    return <CustomerHomeStack/>;
  }
};

const SignedInDrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{
      // headerShown: true,
      headerStyle: { backgroundColor: Colors.lightGrey },
    }}
  >
    <Drawer.Screen name="Home" component={HomeStackNavigator} />
    <Drawer.Screen
      name="About"
      options={{ headerShown: true }}
      component={About}
    />
    <Drawer.Screen name="SignOut" component={Signout} />
  </Drawer.Navigator>
);

const SignedOutDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Signin">
    <Drawer.Screen name="Signin" component={Signin} />
  </Drawer.Navigator>
);

export { SignedInDrawerNavigator, SignedOutDrawerNavigator };
