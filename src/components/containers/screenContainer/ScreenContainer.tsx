import {View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {ScreenContainerProps} from './ScreenContainerProps';

const ScreenContainer = ({children, style}: ScreenContainerProps) => (
  <View style={{...styles.container, ...style}}>{children}</View>
);

export default ScreenContainer;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$colorBackground',
    alignItems: 'center',
  },
});
