import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles';
import { ShadowCard } from '../components';
import { Dropdown } from "../assets";

export default function ({ navigation }) {
  return (
    <View style={styles.container}>
      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Select a category</Text>
        <Dropdown />
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
    fontSize: 20,
    paddingBottom: 10,
  },
  Dropdown: {
    flexDirection: 'row'
  },
  card: {
    height: 150,
  },
});
