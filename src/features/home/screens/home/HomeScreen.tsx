import {Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import ScreenContainer from '~/components/containers/screenContainer/ScreenContainer';
import {useNavigation} from '@react-navigation/native';
import {RootScreenNavigationType} from '~/navigators/routes/RootStack';
import Button from '~/components/buttons/button/Button';
import {vhToPixelNumber, vwToPixelNumber} from '~/constants/EStyleSheetBuilder';

const HomeScreen = () => {
  const navigation = useNavigation<RootScreenNavigationType>();

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Rimador</Text>
      <View style={styles.buttonsContainer}>
        <Button
          label="Librería de palabras"
          containerStyle={styles.button}
          onPress={() => navigation.navigate('Words/Library')}
        />
        <Button
          label="Generador de palabras"
          onPress={() => navigation.navigate('Words/Library')}
        />
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: vwToPixelNumber(10),
    paddingBottom: vhToPixelNumber(10),
  },
  buttonsContainer: {
    width: '60%',
  },
  button: {
    marginBottom: vhToPixelNumber(1),
  },
});
