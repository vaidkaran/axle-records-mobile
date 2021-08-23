import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getShopDetails} from '../api/axleRecordsApi/shops';
import {Button} from 'react-native-elements';

export default function({navigation, route}) {
  // useEffect(() => {
  //   (async () => {
  //     const details = await getShopDetails(route.params.shopId);
  //   })();
  // }, [navigation, route])

  return (
    <Text>Add jobs screen</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});