import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { Colors } from '../styles';
import { ShadowCard } from '../components';
import { PlusIcon, DrawerIcon, Edit } from '../assets';
import { getVehicles } from '../api/axleRecordsApi/vehicles';

export default function ({ navigation, route }) {
  const [vehicles, setVehicles] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);

  React.useEffect(() => {
    (async () => {
      setVehicles(await getVehicles());
    })();
  }, [route.params]);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerIcon onPress={() => navigation.openDrawer()} />,
    });
  }, [navigation]);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <View style={styles.container}>
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
      ></Overlay>
      {vehicles ? (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ShadowCard
              style={styles.card}
              onPress={() => navigation.navigate('AddVehicle')}
            >
              <View style={{ flex: 1, width: '100%' }}>
                <View
                  style={{
                    flex: 1,
                    position: 'absolute',
                    right: 1,
                  }}
                >
                  <Edit onPress={toggleOverlay} />
                </View>
                <View
                  style={{
                    flex: 4,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={styles.message}>{item.name}</Text>
                </View>
              </View>
            </ShadowCard>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <ShadowCard
        style={styles.card}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <Text style={styles.message}>Add a vehicle</Text>
        <PlusIcon />
      </ShadowCard>
      <StatusBar style="auto" />
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
    height: '70%',
    width: '80%',
    borderRadius: 20,
  },
});
