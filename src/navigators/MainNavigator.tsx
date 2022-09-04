import React from 'react';
import {RootStackParamList} from './routes/RootStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LibraryScreen from '~/features/words/screens/library/LibraryScreen';
import WordDetailScreen from '~/features/words/screens/wordDetail/WordDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Words/Library" component={LibraryScreen} />
      <Stack.Screen name="Words/Detail" component={WordDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
