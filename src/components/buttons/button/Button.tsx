import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ButtonProps} from './ButtonProps';
import {EStyleSheetBuilder} from '~/constants';
import {vwToPixelNumber} from '~/constants/EStyleSheetBuilder';

const Button = ({onPress, label, containerStyle, labelStyle}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...containerStyle}}
      onPress={onPress}>
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$colorPrimary',
    width: '100%',
    borderRadius: vwToPixelNumber(9),
    paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: vwToPixelNumber(4),
  },
});
