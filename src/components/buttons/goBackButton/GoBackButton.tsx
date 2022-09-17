import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootScreenNavigationType} from '~/navigators/routes/RootStack';
import {GoBackButtonProps} from './GoBackButtonProps';
import IconButton from '../IconButton/IconButton';
import BackIcon from './assets/back.svg';
import {Colors, EStyleSheetBuilder} from '~/constants';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const GoBackButton = ({label = 'Atrás'}: GoBackButtonProps) => {
  const navigation = useNavigation<RootScreenNavigationType>();

  const onPress = () => (navigation.canGoBack() ? navigation.goBack() : {});

  return (
    <View style={styles.container}>
      <IconButton
        svgIcon={<BackIcon fill={Colors.primary} />}
        onPress={onPress}
      />
      {label && <Text>{label}</Text>}
    </View>
  );
};

export default GoBackButton;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
