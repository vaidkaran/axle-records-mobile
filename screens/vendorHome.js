import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { Colors } from '../styles';

export default function () {
  return (
    <View style={styles.container}>
      <Text>Vendor home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
  },
  message: {
    fontSize: 20,
    paddingBottom: 10,
  },
  card: {
    height: 150,
  },
  overlay: {
    height: '50%',
    width: '80%',
    borderRadius: 20,
  },
});
