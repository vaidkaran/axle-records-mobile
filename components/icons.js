import React from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const DrawerIcon = ({ onPress }) => {
  return <Ionicons name="ios-menu" size={24} color="black" onPress={onPress} />;
};

const PlusIcon = ({ onPress, size }) => {
  return (
    <AntDesign name="pluscircleo" size={size || 60} color="black" onPress={onPress} />
  );
};

module.exports = {
  DrawerIcon,
  PlusIcon,
};
