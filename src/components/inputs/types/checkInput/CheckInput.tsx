import {TouchableWithoutFeedback, View} from 'react-native';
import React, {useState} from 'react';
import InputLabel from '../../sharedComponents/inputLabel/InputLabel';
import InputErrorMessage from '../../sharedComponents/inputErrorMessage/InputErrorMessage';
import {useController} from 'react-hook-form';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {BaseInputProps} from '../../models/BaseInputProps';
import CheckIconState from './checkIconState/CheckIconState';

const CheckInput = ({label, errorMsg, ...props}: BaseInputProps) => {
  const {field} = useController(props);
  const [selected, setSelected] = useState(
    typeof field.value == 'boolean' ? field.value : false,
  );

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => setSelected((prev: boolean) => !prev)}>
        <View style={styles.rowContainer}>
          <CheckIconState error={errorMsg ? true : false} selected={selected} />
          <InputLabel label={label} />
        </View>
      </TouchableWithoutFeedback>
      <InputErrorMessage message={errorMsg} />
    </View>
  );
};

export default CheckInput;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
