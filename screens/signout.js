import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import AuthContext from "../context/auth";
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles'
import * as firebase from 'firebase';

export default function() {
  const { setIsSignedIn } = useContext(AuthContext);

  React.useEffect(() => {
    setIsSignedIn(false);
    firebase.auth().signOut();
  }, []);

  return <View></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


