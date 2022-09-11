import {Text} from 'react-native';
import React from 'react';
import {InputLabelProps} from './InputLabelProps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, EStyleSheetBuilder} from '~/constants';

const InputLabel = ({label}: InputLabelProps) => {
  return <Text style={styles.label}>{label}</Text>;
};

export default InputLabel;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  label: {
    fontSize: '.7rem',
    lineHeight: '1rem',
    color: Colors.gray,
    textTransform: 'uppercase',
    letterSpacing: '.085rem',
  },
});
