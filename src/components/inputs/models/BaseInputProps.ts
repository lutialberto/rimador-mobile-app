import {UseControllerProps} from 'react-hook-form';
import {BaseProps} from '~/constants';
import {FormValues} from './FormValues';

export interface BaseInputProps
  extends BaseProps,
    UseControllerProps<FormValues> {
  label: string;
  errorMsg?: string;
}
