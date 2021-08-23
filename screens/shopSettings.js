import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getShopDetails} from '../api/axleRecordsApi/shops';
import {Button} from 'react-native-elements';

export default function({navigation, route}) {
  useEffect(() => {
    (async () => {
      const details = await getShopDetails(route.params.shopId);
    })();
  }, [navigation, route])

  return (
    <View style={styles.container}>
      <Button title='Add jobs' onPress={()=>navigation.navigate('AddJob')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});