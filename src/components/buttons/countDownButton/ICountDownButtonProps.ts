import {ButtonProps} from '../button/ButtonProps';

export interface ICountDownButtonProps extends ButtonProps {
  seconds: number;
  startCountDown?: boolean;
  handleCountDownFinished: () => void;
}
