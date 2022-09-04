import {Text} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';

const NoData = () => <Text style={styles.message}>NoData</Text>;
export default NoData;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  message: {
    textAlign: 'center',
  },
});
