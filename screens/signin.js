import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Colors } from '../styles'
import { Logo, GoogleIcon } from '../assets';

export default function () {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={Logo}/>
      </View>
      <View style={styles.signinOptions}>
        <Image source={GoogleIcon} />
        <Button title='sign in with Google'/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    alignItems: 'flex-start',
    marginVertical: 100,
  },
  signinOptions: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  }
});

