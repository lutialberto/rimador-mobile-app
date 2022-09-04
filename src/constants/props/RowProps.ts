import {BaseProps} from './BaseProps';

export interface RowProps<T> extends BaseProps {
  item: T;
  onPress?: (item: T) => void;
}
