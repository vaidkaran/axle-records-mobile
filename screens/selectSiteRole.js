import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { ShadowCard } from '../components';
import { Colors } from '../styles';
import { Text, Overlay, Button } from 'react-native-elements';
import {addSiteRole, getUserInfo} from '../api/axleRecordsApi/users';
import AuthContext from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function () {
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [chosenSiteRole, setChosenSiteRole] = useState();
  const [confirmationMsg, setConfirmationMsg] = useState();
  const { userData, setUserData } = useContext(AuthContext);

  const openOverlay = (roleName) => {
    const msg = `You are choosing to register as a ${roleName}.\n\nAre you sure?\n`;
    setConfirmationMsg(msg);
    setChosenSiteRole(roleName)
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setChosenSiteRole(null);
  };

  const onConfirmation = async () => {
    const res = await addSiteRole(chosenSiteRole, {fullRes: true});
    if(res.status === 201) {
      const userInfo = await getUserInfo();
      console.log(`user added as ${chosenSiteRole}`);
      console.log(`userData is: `, userData);
      console.log(`userInfo is: `, userInfo);
      setUserData(userInfo);
      // TODO: use re-usable functions like asyncStorage.setUserData to avoid typos in keys
      await AsyncStorage.setItem('@userData', JSON.stringify(userInfo))
    } else {
      console.error('Something went wrong in adding role')
    }
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          <Text h3>Get started as a...</Text>
          <ShadowCard onPress={() => openOverlay('customer')}>
            <Text h4> Customer </Text>
          </ShadowCard>

          <ShadowCard onPress={() => openOverlay('vendor')}>
            <Text h4> Vendor </Text>
          </ShadowCard>

          <Overlay
            overlayStyle={styles.overlay}
            isVisible={overlayVisible}
            onBackdropPress={closeOverlay}
          >
            <Text style={styles.configmationMsg}>{confirmationMsg}</Text>
            <Button type="solid" title="Confirm" onPress={onConfirmation}/>
          </Overlay>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    marginTop: 20,
    alignItems: 'center',
  },
  configmationMsg: {
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
    padding: 30,
  },
});
