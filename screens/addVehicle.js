import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../styles';
import { ShadowCard, Picker } from '../components';

const carBrands = ['maruti suzuki', 'nissan', 'honda', 'ford'];
const bikeBrands = ['tvs', 'baja', 'honda', 'ktm'];
const categories = ['car', 'bike', 'scooter'];

export default function ({ navigation }) {
  const [selectedVehicleBrand, setSeletedVehicleBrand] = useState(null);
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState(null);

  const onCategoryValueChange = (itemValue, itemIndex) => {
    if (itemValue !== null) console.log('category changed');
    setSelectedVehicleCategory(itemValue);
  };
  const onBrandValueChange = (itemValue, itemIndex) => {
    if (itemValue !== null) console.log('brand changed');
    setSeletedVehicleBrand(itemValue);
  };

  const showBrandPicker = () => {
    if (selectedVehicleCategory !== null) {
      return (
        <Picker
          items={brands}
          selectedValue={selectedVehicleBrand}
          onValueChange={onBrandValueChange}
          defaultLabel="Select a brand"
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        items={categories}
        selectedValue={selectedVehicleCategory}
        onValueChange={onCategoryValueChange}
        defaultLabel="Select a Category"
      />
      {showBrandPicker()}
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
