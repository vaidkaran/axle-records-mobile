import React from 'react';
import { Button } from 'react-native-elements';
import {blue} from '../styles/colors';

export default function ({ title, color, onPress }) {
  console.log('color is: ', color)
  return <Button type="solid" buttonStyle={{backgroundColor: color || blue}} onPress={onPress} title={title} />;
}
