import {Alert} from 'react-native';

export const handleCustomError = (
  error: any,
  message: string,
  onPress: () => void = () => {},
) => {
  console.error({error});
  Alert.alert('Error', message, [
    {
      onPress: onPress,
      text: 'Ok',
    },
  ]);
};

export const handleGenericError = (
  error: any,
  onPress: () => void = () => {},
) => {
  handleCustomError(error, 'Ha ocurrido un error', onPress);
};
