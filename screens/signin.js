import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Colors } from '../styles';
import { AppLogo, GoogleIcon } from '../assets';
import { DrawerIcon } from '../components/icons';
import { googleSignIn } from '../helpers/auth';
import AuthContext from '../context/auth';

export default function ({ navigation }) {
  const { setIsSignedIn } = useContext(AuthContext);
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerIcon onPress={() => navigation.openDrawer()} />,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={AppLogo} />
      </View>
      <View style={styles.signinOptions}>
        <Image source={GoogleIcon} />
        <Button
          title="sign in with Google"
          onPress={() => googleSignIn(setIsSignedIn)}
        />
      </View>
      <View style={styles.aboutLink}>
        <Text>About this app (TODO: this should go to about screen)</Text>
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
});
