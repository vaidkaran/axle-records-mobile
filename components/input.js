import React from 'react';
import { Input } from 'react-native-elements';

export default function ({ styles, onChangeText, placeholder }) {
  return (
    <Input placeholder={placeholder || "placeholder text here"} onChangeText={onChangeText} />
  );
}
