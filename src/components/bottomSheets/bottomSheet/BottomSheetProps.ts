import {BaseProps} from '~/constants';

export interface BottomSheetProps extends BaseProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  flex?: number;
  keyboardVerticalOffset?: number;
}
