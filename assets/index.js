import GoogleIcon from './googleIcon.png';
import AppLogo from './appLogo.png';
import React from 'react';
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
  EvilIcons,
} from '@expo/vector-icons';

const DrawerIcon = ({ onPress }) => {
  return <Ionicons name="ios-menu" size={24} color="black" onPress={onPress} />;
};

const DotsVertical = ({ onPress }) => {
  return <MaterialCommunityIcons name="dots-vertical" size={30} color="black" onPress={onPress} />
};

const Edit = ({ onPress }) => {
  return <Entypo name="edit" size={24} color="black" onPress={onPress} />;
};

const PlusIcon = ({ onPress, size }) => {
  return <AntDesign name="pluscircleo" size={size || 60} color="black" onPress={onPress} />
};

const GearIcon = ({onPress}) => {
  return <EvilIcons name="gear" size={30} color="black" style={{paddingHorizontal: 10}} onPress={onPress}/>
};

const BinIcon = ({onPress, size, color}) => {
  return <AntDesign name="delete" onPress={onPress} size={size || 20} color={color||"red"} />
}

const EyeIcon = ({onPress, size, color}) => {
  return <Ionicons name="eye-outline" onPress={onPress} size={size || 20} color={color || "blue"} />
};

module.exports = {
  AppLogo,
  GoogleIcon,
  DrawerIcon,
  PlusIcon,
  DotsVertical,
  Edit,
  GearIcon,
  BinIcon,
  EyeIcon,
};
