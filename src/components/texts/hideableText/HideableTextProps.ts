import {BaseProps} from '~/constants';

export interface HideableTextProps extends BaseProps {
  content: string;
  hideContent: boolean;
  replaceWithSymbol?: string;
}
