import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles';
import { ShadowCard } from '../components';
import { PlusIcon, DrawerIcon } from "../assets";

export default function ({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerIcon onPress={() => navigation.openDrawer()} />,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Car 1</Text>
        <PlusIcon />
      </ShadowCard>

      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Car 2</Text>
        <PlusIcon />
      </ShadowCard>

      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Car 2</Text>
        <PlusIcon />
      </ShadowCard>

      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Car 2</Text>
        <PlusIcon />
      </ShadowCard>

      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Car 2</Text>
        <PlusIcon />
      </ShadowCard>


      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Add a vehicle</Text>
        <PlusIcon />
      </ShadowCard>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  message: {
    fontSize: 20,
    paddingBottom: 10,
  },
  card: {
    height: 150,
  },
});
