import {BaseInputProps} from '../../models/BaseInputProps';

export interface SelectorInputProps extends BaseInputProps {
  options: SelectorInputOption[];
  placeholder?: string;
  zIndex: number;
  zIndexInverse: number;
  emptyOptionsMessage?: string;
  displayOptionsMode?: 'FLATLIST' | 'MODAL' | 'SCROLLVIEW';
}

export type SelectorInputOption = {
  label: string;
  value: string;
};
