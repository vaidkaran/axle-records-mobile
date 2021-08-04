import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from './colors';

module.exports = StyleSheet.create({
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
