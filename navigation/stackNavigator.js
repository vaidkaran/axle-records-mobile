import React from 'react';
import {
  CustomerHome,
  VendorHome,
  SelectSiteRole,
  AddVehicle,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

const CustomerHomeStack = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={CustomerHome} />
    <HomeStack.Screen name="AddVehicle" component={AddVehicle} />
  </HomeStack.Navigator>
);

const VendorHomeStack = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={VendorHome} />
  </HomeStack.Navigator>
);

const SelectSiteRoleStack = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={SelectSiteRole} />
  </HomeStack.Navigator>
);

module.exports = {
  CustomerHomeStack,
  VendorHomeStack,
  SelectSiteRoleStack,
};
