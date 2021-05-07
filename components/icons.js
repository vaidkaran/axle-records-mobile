import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const DrawerIcon = ({ onPress }) => {
  return (
    <Ionicons
      name="ios-menu"
      size={24}
      color="black"
      onPress={onPress}
    />
  );
}


module.exports = {
  DrawerIcon,
}