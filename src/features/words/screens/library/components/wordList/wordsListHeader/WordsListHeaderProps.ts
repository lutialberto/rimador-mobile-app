import {BaseProps} from '~/constants';

export interface WordListHeaderProps extends BaseProps {
  openFilterPanel: () => void;
  matchedWordsCount: number;
}
