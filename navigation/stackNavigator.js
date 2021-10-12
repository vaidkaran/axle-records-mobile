import React from 'react';
import {
  CustomerHome,
  VendorHome,
  SelectSiteRole,
  AddVehicle,
  AddShop,
  Shop,
  ShopSettings,
  AddJob,
  NewJobsheet,
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
    <VHomeStack.Screen name="NewJobsheet" component={NewJobsheet} />
    <VHomeStack.Screen name="Shop" component={Shop} />
    <VHomeStack.Screen name="ShopSettings" component={ShopSettings} />
    <VHomeStack.Screen name="AddJob" component={AddJob} />
  </VHomeStack.Navigator>
);

const SelectSiteRoleStack = () => (
  <SiteRoleStack.Navigator initialRouteName="Home">
    <SiteRoleStack.Screen name="Home" component={SelectSiteRole} />
  </SiteRoleStack.Navigator>
);

module.exports = {
  CustomerHomeStack,
  VendorHomeStack,
  SelectSiteRoleStack,
};
