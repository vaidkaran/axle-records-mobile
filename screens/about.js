import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles';
import { DrawerIcon } from '../assets';

export default function ({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerIcon onPress={() => navigation.openDrawer()} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>About</Text>
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
});
