import {UseControllerProps} from 'react-hook-form';
import {BaseProps} from '~/constants';
import {FormValues} from '../models/FormValues';

export interface TextInputAppProps
  extends BaseProps,
    UseControllerProps<FormValues> {
  label: string;
  onSubmitInput: () => void;
  clearInput: () => void;
  lastInputForm?: boolean;
  type?: 'password' | 'email' | 'numeric';
  placeholder?: string;
  errorMsg?: string;
}
