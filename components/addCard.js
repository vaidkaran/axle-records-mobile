import React from 'react';
import ShadowCard from './shadowCard';
import { PlusIcon } from '../assets';
import { StyleSheet, Text } from 'react-native';

export default function ({ children, style, onPress, title }) {
  return (
    <ShadowCard
      style={styles.card}
      onPress={onPress}
    >
      {children}
      <Text style={styles.title}>{title}</Text>
      <PlusIcon />
    </ShadowCard>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 150,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
});
