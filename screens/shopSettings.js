import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {getShopDetails} from '../api/axleRecordsApi/shops';
import {Button} from 'react-native-elements';

export default function({navigation, route}) {
  const shopId = useRef(null);

  useEffect(() => {
    (async () => {
      shopId.current = route.params.shopId;
      const details = await getShopDetails(shopId.current);
    })();
  }, [navigation, route])

  return (
    <View style={styles.container}>
      <Button title='Add jobs' onPress={()=>navigation.navigate('AddJob', {shopId: shopId.current})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});