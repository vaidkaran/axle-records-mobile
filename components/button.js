import React from 'react';
import { Button } from 'react-native-elements';

export default function ({ title, color, onPress }) {
  return <Button type="solid" color={color || 'blue'} onPress={onPress} title={title} />;
}
