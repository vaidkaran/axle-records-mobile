import React from 'react';
import { Card } from 'react-native-shadow-cards';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ({ children, style, onPress }) {
  return (
    <TouchableOpacity style={{padding: 20}} onPress={onPress}>
      <Card style={{ ...styles.container, ...style }}>{children}</Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
