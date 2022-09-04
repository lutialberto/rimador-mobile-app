import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EStyleSheetBuilder} from '~/constants';
import MainNavigator from '~/navigators/MainNavigator';

const App = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
