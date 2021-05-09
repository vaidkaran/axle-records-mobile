import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles';
import { ShadowCard } from '../components';
import { PlusIcon } from '../components/icons';

export default function () {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Let's start by adding a vehicle</Text>
      <ShadowCard style={styles.card}>
        <PlusIcon />
      </ShadowCard>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  message: {
    fontSize: 20,
    padding: 20,
  },
  card: {
    height: 100,
  }
});
