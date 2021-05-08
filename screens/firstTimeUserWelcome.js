import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Colors } from '../styles';
import { AppLogo, GoogleIcon } from '../assets';
import { ShadowCard } from '../components';
import { PlusIcon } from '../components/icons';

export default function ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <ShadowCard style={styles.card}>
        <Text style={styles.message}>Let's start by adding a vehicle</Text>
        <PlusIcon />
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
    justifyContent: 'center',
  },
  logo: {
    flex: 3,
    alignItems: 'flex-start',
    marginVertical: 100,
  },
  signinOptions: {
    flex: 2,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  aboutLink: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  heading: {
    fontSize: 40,
    paddingBottom: 150,
  },
  message: {
    fontSize: 25,
    paddingBottom: 20
  },
  card: {
    height: 200,
  },
});
