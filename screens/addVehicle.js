import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getBrands, getModels } from '../api/axleRecordsApi/vehicles';

const carBrands = ['maruti suzuki', 'nissan', 'honda', 'ford'];
const bikeBrands = ['tvs', 'baja', 'honda', 'ktm'];
const categories = ['car', 'bike', 'scooter'];

// const items = [
//   // this is the parent or 'item'
//   {
//     name: 'Fruits',
//     id: 0,
//     // these are the children or 'sub items'
//     children: [
//       {
//         name: 'Apple',
//         id: 10,
//       },
//       {
//         name: 'Strawberry',
//         id: 17,
//       },
//       {
//         name: 'Pineapple',
//         id: 13,
//       },
//       {
//         name: 'Banana',
//         id: 14,
//       },
//       {
//         name: 'Watermelon',
//         id: 15,
//       },
//       {
//         name: 'Kiwi fruit',
//         id: 16,
//       },
//     ],
//   },
// ];

export default function ({ navigation }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      const brands = await getBrands();

      const itemsToSet = [];
      await Promise.all(
        brands.data.map(async (brand) => {
          const models = await getModels(brand.id);
          const modelsList = models.data.map((model) => ({
            id: model.id,
            name: model.name,
          }));
          itemsToSet.push({
            id: brand.id,
            name: brand.name,
            children: modelsList,
          });
        })
      );
      console.log('done');
      setItems(itemsToSet);
    })();
  }, []);

  const [selectedVehicle, setSeletedVehicle] = useState(null);
  const onCategoryValueChange = (itemValue, itemIndex) => {
    if (itemValue !== null) console.log('category changed');
    setSelectedVehicleCategory(itemValue);
  };
  const onBrandValueChange = (itemValue, itemIndex) => {
    if (itemValue !== null) console.log('brand changed');
    setSeletedVehicleBrand(itemValue);
  };

  const ref = useRef(null);
  const footer = () => {
    return (
      <Button
        color="red"
        title="cancel"
        onPress={() => ref?.current?._toggleSelector()}
      />
    );
  };
  const [chosenItems, setChosenItems] = useState([]);

  return (
    // <View style={styles.container}>
    <View>
      <SectionedMultiSelect
        stickyFooterComponent={footer}
        single={true}
        hideConfirm={true}
        items={items}
        IconRenderer={MaterialIcons}
        uniqueKey="id"
        readOnlyHeadings={true}
        subKey="children"
        selectText="Choose just one..."
        searchPlaceholderText='Search here (eg: "Honda" or "vento")'
        onSelectedItemsChange={(itemChosen) => {
          console.log('this', itemChosen);
          setChosenItems(itemChosen);
        }}
        selectedItems={chosenItems}
        ref={ref}
      />

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
