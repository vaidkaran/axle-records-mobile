import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getShopDetails} from '../api/axleRecordsApi/shops';
import {GearIcon} from '../assets';

export default function({navigation, route}) {
  useEffect(() => {
    (async () => {
      const details = await getShopDetails(route.params.shopId);
      navigation.setOptions({
        // Goto shop settings page on click of gear icon
        headerRight: () => { return(<GearIcon onPress={() => {navigation.navigate('ShopSettings', {shopId: route.params.shopId})}} />) },
      });
    })();
  }, [navigation, route])

  return (
    <View>
      <Text>Shop screen</Text>
    </View>
  );
};