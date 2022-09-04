import {BottomSheetProps} from '~/components/bottomSheets/bottomSheet/BottomSheetProps';
import {IWordFilters} from '~/features/words/models/IWordFilters';

export interface WordBottomSheetProps extends BottomSheetProps {
  fetchWords: (filters: IWordFilters) => void;
}
