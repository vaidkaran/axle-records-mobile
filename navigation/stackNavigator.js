import React from 'react';
import {
  CustomerHome,
  VendorHome,
  SelectSiteRole,
  AddVehicle,
  AddShop,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

const SiteRoleStack = createStackNavigator();
const CHomeStack = createStackNavigator();
const VHomeStack = createStackNavigator();

const CustomerHomeStack = () => (
  <CHomeStack.Navigator initialRouteName="CustomerHome">
    <CHomeStack.Screen name="Home" component={CustomerHome} />
    <CHomeStack.Screen name="AddVehicle" component={AddVehicle} />
  </CHomeStack.Navigator>
);

const VendorHomeStack = () => (
  <VHomeStack.Navigator initialRouteName="VendorHome">
    <VHomeStack.Screen name="Home" component={VendorHome} />
    <VHomeStack.Screen name="AddShop" component={AddShop} />
  </VHomeStack.Navigator>
);

const SelectSiteRoleStack = () => (
  <SiteRoleStack.Navigator initialRouteName="Home">
    <SelectSiteRoleStack.Screen name="Home" component={SelectSiteRole} />
  </SiteRoleStack.Navigator>
);

module.exports = {
  CustomerHomeStack,
  VendorHomeStack,
  SelectSiteRoleStack,
};
