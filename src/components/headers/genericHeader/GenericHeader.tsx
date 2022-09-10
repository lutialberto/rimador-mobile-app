import {Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {GenericHeaderProps} from './GenericHeaderProps';
import GoBackButton from '~/components/buttons/goBackButton/GoBackButton';
import {vhToPixelNumber, vwToPixelNumber} from '~/constants/EStyleSheetBuilder';

const GenericHeader = ({title, showBackButton = true}: GenericHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        {showBackButton && <GoBackButton containerStyle={styles.backButton} />}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default GenericHeader;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: vhToPixelNumber(1),
  },
  backButton: {
    minWidth: vwToPixelNumber(25),
    minHeight: vhToPixelNumber(4),
  },
  backContainer: {
    position: 'absolute',
    left: 1,
  },
});
