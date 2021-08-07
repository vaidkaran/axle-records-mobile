import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export default function ({
  inputContainerStyle,
  onChangeText,
  placeholder,
  defaultValue,
  disabled,
  clearTextOnFocus,
}) {
  return (
    <Input
      inputContainerStyle={inputContainerStyle}
      clearTextOnFocus={clearTextOnFocus || true}
      placeholder={placeholder || 'placeholder text here'}
      defaultValue={defaultValue}
      disabled={disabled || false}
      onChangeText={onChangeText}
    />
  );
}
