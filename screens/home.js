import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import { Colors } from '../styles';
import { ShadowCard } from '../components';
import { PlusIcon, DrawerIcon, Edit } from '../assets';
import {
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from '../api/axleRecordsApi/vehicles';

export default function ({ navigation, route }) {
  const [vehicles, setVehicles] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [vehicleUpdateData, setVehicleUpdateData] = useState({});

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

  const openOverlay = (vehicleId, vehicleName) => {
    setVehicleUpdateData({ id: vehicleId, name: vehicleName });
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setVehicleUpdateData({});
  };

  const updateVehicleName = async () => {
    await updateVehicle(vehicleUpdateData.id, vehicleUpdateData.name);
    setOverlayVisible(false);
    setVehicles(await getVehicles());
  };

  const deleteSelectedVehicle = async () => {
    await deleteVehicle(vehicleUpdateData.id)
    setOverlayVisible(false);
    setVehicles(await getVehicles());
  }

  return (
    <View style={styles.container}>
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={overlayVisible}
        onBackdropPress={closeOverlay}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 8 }}>
            <Input
              defaultValue={vehicleUpdateData.name}
              rightIcon={<Edit />}
              rightIcon={{ type: 'antdesign', name: 'edit' }}
              onChangeText={(name) =>
                setVehicleUpdateData({ id: vehicleUpdateData.id, name })
              }
            />
            <Button type="solid" title="Save" onPress={updateVehicleName} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              type="solid"
              title="Delete"
              buttonStyle={{ backgroundColor: 'red' }}
              onPress={deleteSelectedVehicle}
            />
          </View>
        </View>
      </Overlay>
      {vehicles ? (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ShadowCard style={styles.card}>
              <View style={{ flex: 1, width: '100%' }}>
                <View
                  style={{
                    flex: 1,
                    position: 'absolute',
                    right: 1,
                  }}
                >
                  <Edit onPress={() => openOverlay(item.id, item.name)} />
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
    height: '50%',
    width: '80%',
    borderRadius: 20,
  },
});
