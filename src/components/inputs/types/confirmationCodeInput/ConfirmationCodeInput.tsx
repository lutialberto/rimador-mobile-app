import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import EStyleSheet from 'react-native-extended-stylesheet';
import { EStyleSheetBuilder } from '~/constants';
import { vwToPixelNumber } from '~/constants/EStyleSheetBuilder';
import { BaseInputProps } from '../../models/BaseInputProps';

const CELL_COUNT = 6;

const ConfirmationCodeInput = (props: BaseInputProps) => {
  const { field } = useController(props);

  const ref = useBlurOnFulfill({ value: field.value, cellCount: CELL_COUNT });
  const [props1, getCellOnLayoutHandler] = useClearByFocusCell({
    value: field.value,
    setValue: field.onChange,
  });

  return (
    <CodeField
      ref={ref}
      {...props1}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={field.value}
      onChangeText={field.onChange}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

export default ConfirmationCodeInput;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  cell: {
    aspectRatio: 1,
    width: vwToPixelNumber(9),
    lineHeight: vwToPixelNumber(10),
    fontSize: vwToPixelNumber(8),
    borderBottomWidth: 2,
    borderColor: '$colorGray',
    textAlign: 'center',
    color: '$colorBlack',
    marginHorizontal: 2,
  },
  focusCell: {
    borderColor: '$colorPrimary',
  },
});
