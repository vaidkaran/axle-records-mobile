import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { Colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getAllModels } from '../api/axleRecordsApi/vehicles';

export default function ({ navigation }) {
  const [items, setItems] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState();
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      const itemsToSet = [];
      const modelsInfo = await getAllModels();
      modelsInfo.map((brand) => {
        const modelsList = brand.vehicle_models.map((model) => ({
          id: model.id,
          name: model.name,
        }));
        itemsToSet.push({
          id: brand.id,
          name: brand.name,
          children: modelsList,
        });
      });
      setItems(itemsToSet);
    })();
  }, []);

  const footer = () => {
    return (
      <Button
        color="red"
        title="cancel"
        onPress={() => ref?.current?._toggleSelector()}
      />
    );
  };

  return (
    // TODO: maybe show the selector only once we have response from server; else show spinner
    // TODO: same with select variant selector
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
        selectText="Select vehicle model"
        searchPlaceholderText='Search here (eg: "Honda" or "Activa")'
        onSelectedItemsChange={([chosenModelId]) => {
          console.log('before ', selectedModelId);
          setSelectedModelId(chosenModelId);
          console.log('after ', selectedModelId);
        }}
        selectedItems={[selectedModelId]}
        ref={ref}
      />

      {selectedModelId ? (
        <View>
          <Text>Show variant selector for {selectedModelId}</Text>
        </View>
      ) : (
        <></>
      )}

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
