import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../styles';
import { Input } from '../components';

export default function ({ navigation }) {
  return (
    <View>
      {/* <Text>Add shop screen</Text> */}
      <Input placeholder='Name' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
});
