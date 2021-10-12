import React, {useEffect} from 'react';
import {View, StyleSheet, Text, MaskedViewIOS} from 'react-native';
import {getShopDetails} from '../api/axleRecordsApi/shops';
import {GearIcon} from '../assets';
import {Button} from '../components';

export default function({navigation, route}) {
  const header = () => {
    return(
      <View style={styles.headerOptionsContainer}>
        <Button 
          title='New Jobsheet'
          style={styles.headerButton}
          onPress={() => navigation.navigate('NewJobsheet', {shopId: route.params.shopId})} 
        />
        <View style={styles.headerGearIcon}>
          <GearIcon onPress={() => {navigation.navigate('ShopSettings', {shopId: route.params.shopId})}} />
        </View>
      </View>
    );
  }

  useEffect(() => {
    (async () => {
      const details = await getShopDetails(route.params.shopId);
      navigation.setOptions({
        // Goto shop settings page on click of gear icon
        headerRight: header
      });
    })();
  }, [navigation, route])

  return (
    <View>
      <Text>Shop screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerOptionsContainer: {
    flexDirection: 'row'
  },
  headerButton: {
    flex: 1,
  },
  headerGearIcon: {
    flex: 1,
  }
});