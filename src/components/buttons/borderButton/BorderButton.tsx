import React from 'react';
import Button from '../button/Button';
import {BorderButtonProps} from './BorderButtonProps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';

const BorderButton = ({
  containerStyle,
  labelStyle,
  ...props
}: BorderButtonProps) => {
  return (
    <Button
      {...props}
      containerStyle={{...styles.container, ...containerStyle}}
      labelStyle={{...styles.label, ...labelStyle}}
    />
  );
};

export default BorderButton;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$colorTransparent',
    borderColor: '$colorPrimary',
    borderWidth: 1,
  },
  label: {
    color: '$colorPrimary',
  },
});
