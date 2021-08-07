import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Colors } from "../styles";
import { Input, Button } from "../components";
import {createShop} from '../api/axleRecordsApi/shops';

export default function ({ navigation }) {
  const defaultCountry = 'India';
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pin, setPin] = useState();

  const addShop = async () => {
    const validationPassed = validateFields();
    if(validationPassed) {
      const res = await createShop({name, address, city, state, pin, country: defaultCountry});
      console.log('res from createShop: ', res);
      navigation.navigate('Home', {refresh: true});
    } else {
      Alert.alert('Please fill all the fields');
    }
  };
  
  const validateFields = () => {
    if (
      !!name === false ||
      !!address === false ||
      !!city === false ||
      !!state === false ||
      !!pin === false
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Name of the shop" onChangeText={(value) => {setName(value)}} />
      <Input placeholder="Address" onChangeText={(value) => {setAddress(value)}} />
      <Input placeholder="City" onChangeText={(value) => {setCity(value)}} />
      <Input placeholder="State" onChangeText={(value) => {setState(value)}} />
      <Input placeholder="Pin" onChangeText={(value) => {setPin(value)}} />
      <Input placeholder="Country" defaultValue={defaultCountry} disabled={true} />
      <Button title="Submit" onPress={addShop} />
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
});
