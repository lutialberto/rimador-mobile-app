import {Text} from 'react-native';
import React from 'react';
import {InputErrorMessageProps} from './InputErrorMessageProps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';

const InputErrorMessage = ({message, style}: InputErrorMessageProps) =>
  message ? (
    <Text style={{...styles.message, ...style}}>{message}</Text>
  ) : (
    <></>
  );

export default InputErrorMessage;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  message: {
    color: 'red',
  },
});
