import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ({
  items,
  defaultLabel,
  selectedValue,
  onValueChange,
  style,
}) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 40,
    height: 50,
  },
  container: {
    borderWidth: 2,
    width: '90%',
    elevation: 5,
    margin: 20,
  },
  // TODO: try gradient / linear gradient
});
