import {BaseProps} from '~/constants/props/BaseProps';

export interface ButtonProps extends BaseProps {
  onPress: () => void;
  label: string;
  containerStyle?: any;
  labelStyle?: any;
}
