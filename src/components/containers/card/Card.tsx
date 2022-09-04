import {View} from 'react-native';
import React from 'react';
import {CardProps} from './CardProps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {vwToPixelNumber} from '~/constants/EStyleSheetBuilder';

const Card = ({children}: CardProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default Card;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$colorGrayCircles',
    padding: 10,
    borderRadius: vwToPixelNumber(1),
  },
});
