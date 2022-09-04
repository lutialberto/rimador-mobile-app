import {StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootScreenNavigationType} from '~/navigators/routes/RootStack';
import Button from '../button/Button';
import {GoBackButtonProps} from './GoBackButtonProps';

const GoBackButton = ({label = 'Atras', containerStyle}: GoBackButtonProps) => {
  const navigation = useNavigation<RootScreenNavigationType>();

  const onPress = () => (navigation.canGoBack() ? navigation.goBack() : {});

  return (
    <Button label={label} onPress={onPress} containerStyle={containerStyle} />
  );
};

export default GoBackButton;

const styles = StyleSheet.create({});
