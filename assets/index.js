import GoogleIcon from './googleIcon.png';
import AppLogo from './appLogo.png';
import React from 'react';
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';

const DrawerIcon = ({ onPress }) => {
  return <Ionicons name="ios-menu" size={24} color="black" onPress={onPress} />;
};

const DotsVertical = ({ onPress }) => {
  return (
    <MaterialCommunityIcons
      name="dots-vertical"
      size={30}
      color="black"
      onPress={onPress}
    />
  );
};

const Edit = ({ onPress }) => {
  return <Entypo name="edit" size={24} color="black" onPress={onPress} />;
};

const PlusIcon = ({ onPress, size }) => {
  return (
    <AntDesign
      name="pluscircleo"
      size={size || 60}
      color="black"
      onPress={onPress}
    />
  );
};

module.exports = {
  AppLogo,
  GoogleIcon,
  DrawerIcon,
  PlusIcon,
  DotsVertical,
  Edit,
};
