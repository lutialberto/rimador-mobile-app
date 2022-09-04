import React from 'react';
import {NoBorderButtonProps} from './NoBorderButtonProps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import Button from '../button/Button';

const NoBorderButton = ({
  containerStyle,
  labelStyle,
  ...props
}: NoBorderButtonProps) => {
  return (
    <Button
      {...props}
      containerStyle={{...styles.container, containerStyle}}
      labelStyle={{...styles.label, ...labelStyle}}
    />
  );
};

export default NoBorderButton;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$colorTransparent',
  },
  label: {
    color: '$colorPrimary',
  },
});
