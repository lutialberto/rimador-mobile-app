import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;

  'Words/Library': undefined;
  'Words/Detail': {id: number};
};

// imported on components that need to use navigate method
export type RootScreenNavigationType =
  NativeStackNavigationProp<RootStackParamList>;

// imported on components that need to use route method
export type WordDetailScreenRouteProp = RouteProp<RootStackParamList>;
