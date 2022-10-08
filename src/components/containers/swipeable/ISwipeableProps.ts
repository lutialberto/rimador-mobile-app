import {BaseProps} from '~/constants';

export interface ISwipeableProps extends BaseProps {
  swipeDistance?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}
