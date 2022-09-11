import {BaseInputProps} from '../models/BaseInputProps';

export interface TextInputAppProps extends BaseInputProps {
  onSubmitInput: () => void;
  clearInput: () => void;
  lastInputForm?: boolean;
  type?: 'password' | 'email' | 'numeric';
  placeholder?: string;
}
