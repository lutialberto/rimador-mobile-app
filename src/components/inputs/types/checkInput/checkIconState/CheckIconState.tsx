import {View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, EStyleSheetBuilder} from '~/constants';
import {CheckIconStateProps} from './CheckIconStateProps';

const CheckIconState = ({error, selected}: CheckIconStateProps) => {
  return (
    <View
      style={{
        ...styles.border,
        ...(error ? styles.error : {}),
      }}>
      <View
        style={{
          ...styles.center,
          ...(selected ? styles.centerSelected : {}),
          ...(error ? styles.error : {}),
        }}
      />
    </View>
  );
};

export default CheckIconState;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  border: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  center: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: Colors.black,
  },
  centerSelected: {
    backgroundColor: Colors.primary,
  },
  error: {
    borderColor: Colors.red,
  },
});
