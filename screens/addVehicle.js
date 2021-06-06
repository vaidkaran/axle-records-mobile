import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {
  createVehicle,
  getAllModels,
  getVariants,
} from '../api/axleRecordsApi/vehicles';

export default function ({ navigation }) {
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState();
  const [selectedModelName, setSelectedModelName] = useState();
  const [selectedVariantId, setSelectedVariantId] = useState();
  const [selectedVariantName, setSelectedVariantName] = useState();
  const [vehicleName, setVehicleName] = useState();

  const modelRef = useRef(null);
  const variantRef = useRef(null);

  const populateVariants = async (modelId) => {
    const variantsInfo = await getVariants(modelId);
    const itemsToSet = variantsInfo.map((variant) => ({
      id: variant.id,
      name: variant.name,
    }));
    setVariants(itemsToSet);
  };

  const addVehicle = async () => {
    const name = vehicleName ? vehicleName : `${selectedModelName} ${selectedVariantName}`
    await createVehicle(name, selectedVariantId);
    navigation.navigate('Home', {refresh: true});
  };

  useEffect(() => {
    (async () => {
      const modelsInfo = await getAllModels();
      const itemsToSet = modelsInfo.map((brand) => {
        const modelsList = brand.vehicle_models.map((model) => ({
          id: model.id,
          name: model.name,
        }));
        return {
          id: brand.id,
          name: brand.name,
          children: modelsList,
        };
      });
      setModels(itemsToSet);
    })();
  }, []);

  const modelFooter = () => {
    return (
      <Button
        color="red"
        title="cancel"
        onPress={() => modelRef?.current?._toggleSelector()}
      />
    );
  };

  const variantFooter = () => {
    return (
      <Button
        color="red"
        title="cancel"
        onPress={() => variantRef?.current?._toggleSelector()}
      />
    );
  };

  return (
    <View>
      <SectionedMultiSelect
        stickyFooterComponent={modelFooter}
        single={true}
        hideConfirm={true}
        items={models}
        IconRenderer={MaterialIcons}
        noItemsComponent={<ActivityIndicator size="large" color="#0000ff" />}
        uniqueKey="id"
        readOnlyHeadings={true}
        subKey="children"
        selectText="Select vehicle model"
        searchPlaceholderText='Search here (eg: "Honda" or "Activa")'
        onSelectedItemObjectsChange={([chosenModel]) => {
          setSelectedModelName(chosenModel.name);
        }}
        onSelectedItemsChange={([chosenModelId]) => {
          setSelectedModelId(chosenModelId);
          populateVariants(chosenModelId);
        }}
        selectedItems={[selectedModelId]}
        ref={modelRef}
      />

      {selectedModelId ? (
        <View>
          <SectionedMultiSelect
            stickyFooterComponent={variantFooter}
            single={true}
            hideConfirm={true}
            items={variants}
            noItemsComponent={
              <ActivityIndicator size="large" color="#0000ff" />
            }
            IconRenderer={MaterialIcons}
            uniqueKey="id"
            selectText="Select vehicle variant"
            searchPlaceholderText="Search here"
            onSelectedItemObjectsChange={([chosenVariant]) => {
              setSelectedVariantName(chosenVariant.name);
            }}
            onSelectedItemsChange={([chosenVariantId]) => {
              setSelectedVariantId(chosenVariantId);
            }}
            selectedItems={[selectedVariantId]}
            ref={variantRef}
          />
        </View>
      ) : (
        <></>
      )}

      {selectedVariantId ? (
        <View>
          <View style={{ margin: 20, borderWidth: 1 }}>
            <TextInput
              placeholder="Enter a name of your choice (optional)"
              onChangeText={(text) => setVehicleName(text)}
              defaultValue={vehicleName}
            />
          </View>
          <View style={{ margin: 20, borderWidth: 1 }}>
            <Button title="Submit" onPress={addVehicle} />
          </View>
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
