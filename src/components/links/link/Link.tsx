import React from 'react';
import {LinkProps} from './LinkProps';
import NoBorderButton from '~/components/buttons/NoBorderButton.tsx/NoBorderButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {useNavigation} from '@react-navigation/native';
import {RootScreenNavigationType} from '~/navigators/routes/RootStack';

const Link = ({label, onPress}: LinkProps) => {
  const navigation = useNavigation<RootScreenNavigationType>();

  return (
    <NoBorderButton label={label} onPress={onPress} labelStyle={styles.label} />
  );
};

export default Link;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  label: {
    textDecorationLine: 'underline',
  },
});
