import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getShopDetails} from '../api/axleRecordsApi/shops';

export default function({navigation, route}) {
  useEffect(() => {
    (async () => {
      const details = await getShopDetails(route.params.shopId);
      console.log('------->', details);
    })();
  }, [route])

  return (
    <View>
      <Text>Shop screen</Text>
    </View>
  );
};