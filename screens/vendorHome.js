import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import { ShadowCard, AddCard } from '../components';
import { DrawerIcon, Edit } from '../assets';
import {
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from '../api/axleRecordsApi/vehicles';
import { getShops, updateShop } from '../api/axleRecordsApi/shops';
import { CardList as styles } from '../styles';

export default function ({ navigation, route }) {
  // const [vehicles, setVehicles] = useState();
  const [shops, setShops] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [shopUpdateData, setShopUpdateData] = useState({});

  React.useEffect(() => {
    (async () => {
      // setVehicles(await getVehicles());
      setShops(await getShops());
    })();
  }, [route.params]);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerIcon onPress={() => navigation.openDrawer()} />,
    });
  }, [navigation]);

  const openOverlay = (shop) => {
    setShopUpdateData({
      id: shop.id,
      name: shop.name,
      address: shop.address,
      city: shop.city,
      state: shop.state,
      pin: shop.pin
    });
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setShopUpdateData({});
  };

  const updateShopDetails = async () => {
    const res = await updateShop(shopUpdateData.id, {
      name: shopUpdateData.name,
      address: shopUpdateData.address,
      city: shopUpdateData.city,
      state: shopUpdateData.state,
      pin: shopUpdateData.pin,
    });
    console.log('update res ------->>>', res)
    setOverlayVisible(false);
    setShops(await getShops());
  };

  const deleteSelectedVehicle = async () => {
    await deleteVehicle(shopUpdateData.id);
    setOverlayVisible(false);
    setVehicles(await getShops());
  };

  return (
    <View style={styles.container}>

      {shops ? (
        // list of existing shops
        <FlatList
          data={shops}
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
                  {/* open the edit modal */}
                  <Edit onPress={() => openOverlay(item)} />
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

      {/* card to add a new vehicle */}
      <AddCard
        onPress={() => navigation.navigate('AddShop')}
        title={'Add a shop'}
      />

      {/* modal to udpate vehicle details or delete vehicle */}
      <Overlay
        overlayStyle={{...styles.editOverlay, height: '80%'}}
        isVisible={overlayVisible}
        onBackdropPress={closeOverlay}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 8 }}>
            <Input
              defaultValue={shopUpdateData.name}
              rightIcon={<Edit />}
              onChangeText={(value) =>
                setShopUpdateData({...shopUpdateData, name: value})
              }
            />
            <Input
              defaultValue={shopUpdateData.address}
              rightIcon={<Edit />}
              onChangeText={(value) =>
                setShopUpdateData({...shopUpdateData, address: value })
              }
            />
            <Input
              defaultValue={shopUpdateData.city}
              rightIcon={<Edit />}
              onChangeText={(value) =>
                setShopUpdateData({...shopUpdateData, city: value })
              }
            />
            <Input
              defaultValue={shopUpdateData.state}
              rightIcon={<Edit />}
              onChangeText={(value) =>
                setShopUpdateData({...shopUpdateData, state: value })
              }
            />
            <Input
              defaultValue={shopUpdateData.pin}
              rightIcon={<Edit />}
              onChangeText={(value) =>
                setShopUpdateData({...shopUpdateData, pin: value })
              }
            />

            <Button type="solid" title="Save" onPress={updateShopDetails} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              type="solid"
              title="Delete shop"
              buttonStyle={{ backgroundColor: 'red' }}
              onPress={deleteSelectedVehicle}
            />
          </View>
        </View>
      </Overlay>

      <StatusBar style="auto" />
    </View>
  );
}

