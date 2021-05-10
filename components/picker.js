import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ({
  items,
  defaultLabel,
  selectedValue,
  onValueChange,
  style,
}) {
  const pickerItems = items.map((item, index) => (
    <Picker.Item label={item} value={item} key={index} />
  ));

  return (
    <Picker
      style={{ ...styles.picker, ...style }}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      <Picker.Item label={defaultLabel || 'Select'} value={null} key={null} />
      {items.map((item, index) => (
        <Picker.Item label={item} value={item} key={index} />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 40,
    height: 50,
    width: '90%',
  },
});
