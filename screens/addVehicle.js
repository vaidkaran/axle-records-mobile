import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles';
import { ShadowCard } from '../components';
import { Dropdown } from '../assets';
import { Picker } from '@react-native-picker/picker';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';

export default function ({ navigation }) {
  const [selectedVehicleCategory, setSeletedVehicleCategory] = useState(null);
  return (
    <View style={styles.container}>
      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <View style={styles.cardItemsContainer}>
          <Picker
            style={{ fontSize: 40, height: 50, width: '90%', borderColor: 'blue'}}
            selectedValue={selectedVehicleCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSeletedVehicleCategory(itemValue)
            }
          >
            <Picker.Item label="Select a category" value={null} />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="hi" />
          </Picker>
        </View>
      </ShadowCard>
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
  Dropdown: {
    flexDirection: 'row',
  },
  card: {
    height: 50,
  },
  cardItemsContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
});
