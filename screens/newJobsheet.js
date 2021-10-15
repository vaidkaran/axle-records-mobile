import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {Button} from '../components';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {Text, Input, ListItem, Overlay} from 'react-native-elements';
import { Colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {getJobProfiles} from '../api/axleRecordsApi/jobProfiles';
import {
  createVehicle,
  getAllModels,
  getVariants,
} from '../api/axleRecordsApi/vehicles';

export default function ({ navigation, route }) {
  const [customerName, setCustomerName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [vehicleNumber, setVehicleNumber] = useState();
  const [vehicleName, setVehicleName] = useState();
  const [vehicleModel, setVehicleModel] = useState();
  const [jobProfiles, setJobProfiles] = useState([]);
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const jobsRef = useRef(null);
  const shopId = useRef(null);

  const setUppercaseVehicleNumber = (text) => {
    setVehicleNumber(text.toUpperCase());
  }

  const onCancel = () => {
    setSelectedJobIds([]);
    jobsRef?.current?._toggleSelector();
  }

  const onConfirm = () => {
    jobsRef?.current?._toggleSelector();
  }

  useEffect(() => {
    (async () => {
      shopId.current = route.params.shopId;
      console.log('shopId current: ', shopId.current)
      const jobProfilesList = await getJobProfiles(shopId.current)
      const jobProfilesArrayToSet = (jobProfilesList.map((jobProfile) => {
        return {
          id: jobProfile.id,
          name: `${jobProfile.job.name} - ₹${jobProfile.price || 0}`,
          description: jobProfile.job.description,
          price: parseFloat(jobProfile.price)
        }
      }));
      // keeping name as empty string since it shows up on top of the list as a category
      setJobProfiles([{name: '', children: jobProfilesArrayToSet}]);
    })();
  }, [navigation, route])

  return (
    <View>
      <Input
        maxLength={50}
        placeholder='Customer name'
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Input
        maxLength={10}
        placeholder='Phone number'
        keyboardType='numeric'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Input
        maxLength={50}
        placeholder='Vehicle name'
        value={vehicleName}
        onChangeText={setVehicleName}
      />
      <Input
        maxLength={10}
        autoCapitalize="characters"
        placeholder='Vehicle number'
        value={vehicleNumber}
        onChangeText={setUppercaseVehicleNumber}
      />
      <Input
        maxLength={50}
        placeholder='Vehicle brand/model'
        value={vehicleModel}
        onChangeText={setVehicleModel}
      />

      <SectionedMultiSelect
        showDropDowns={false}
        items={jobProfiles}
        IconRenderer={MaterialIcons}
        noItemsComponent={<ActivityIndicator size="large" color="#0000ff" />}
        uniqueKey="id"
        readOnlyHeadings={true}
        subKey="children"
        selectText="Select jobs from the list"
        searchPlaceholderText='Search here (eg: "oil change" or "wheel balancing")'
        onSelectedItemsChange={(selectedItemIds) => {
          setSelectedJobIds(selectedItemIds);
        }}
        onSelectedItemObjectsChange={(selectedItems) => {
          const total = selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price;
          }, 0);
          setTotalPrice(total);
        }}
        onCancel={onCancel}
        onConfirm={onConfirm}
        showCancelButton={true}
        selectedItems={selectedJobIds}
        showChips={true}
        ref={jobsRef}
      />

      <View style={{marginVertical: 40, marginHorizontal: 5}}>
        <Text h4>Total: ₹ {totalPrice} </Text>
      </View>
      <View style={{width: '40%', alignSelf: 'center'}}>
        <Button title='Create Jobsheet' />
      </View>
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

