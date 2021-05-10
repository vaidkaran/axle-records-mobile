import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../styles';
import { ShadowCard, Picker } from '../components';

const brands = ['maruti suzuki', 'nissan', 'honda', 'ford'];

export default function ({ navigation }) {
  const [selectedVehicleBrand, setSeletedVehicleBrand] = useState(null);
  const onValueChange = (itemValue, itemIndex) => {
    if (itemValue !== null) console.log('val changed');
    setSeletedVehicleBrand(itemValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        items={brands}
        selectedValue={selectedVehicleBrand}
        onValueChange={onValueChange}
        defaultLabel='Select a brand'
      />

      <View style={styles.cardItemsContainer}></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  message: {
    fontSize: 25,
    paddingRight: 25,
  },
  card: {
    height: 50,
  },
  cardItemsContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
});
