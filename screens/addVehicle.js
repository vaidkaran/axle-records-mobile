import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getAllModels, getVariants } from '../api/axleRecordsApi/vehicles';

export default function ({ navigation }) {
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState();
  const [selectedVariantId, setSelectedVariantId] = useState();
  const ref = useRef(null);
  const variantRef = useRef(null);

  const populateVariants = async (modelId) => {
    const variantsInfo = await getVariants(modelId);
    const itemsToSet = variantsInfo.map((variant) => ({
      id: variant.id,
      name: variant.name,
    }));
    setVariants(itemsToSet);
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
        onPress={() => ref?.current?._toggleSelector()}
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
    // TODO: maybe show the selector only once we have response from server; else show spinner
    // TODO: same with select variant selector
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
        onSelectedItemsChange={([chosenModelId]) => {
          setSelectedModelId(chosenModelId);
          populateVariants(chosenModelId);
        }}
        selectedItems={[selectedModelId]}
        ref={ref}
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
