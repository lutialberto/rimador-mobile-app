import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {SelectorInputProps} from './SelectorInputProps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, EStyleSheetBuilder} from '~/constants';
import {useController} from 'react-hook-form';
import InputErrorMessage from '../inputErrorMessage/InputErrorMessage';
import DropDownPicker from 'react-native-dropdown-picker';
import InputLabel from '../inputLabel/InputLabel';
import {vhToPixelNumber, vwToPixelNumber} from '~/constants/EStyleSheetBuilder';

const SelectorInput = ({
  label,
  errorMsg,
  placeholder = 'Seleccione...',
  options,
  zIndex,
  zIndexInverse,
  emptyOptionsMessage = 'No hay datos',
  displayOptionsMode = 'SCROLLVIEW',
  ...props
}: SelectorInputProps) => {
  const {field} = useController(props);
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <InputLabel label={label} />
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={field.value}
        setValue={(callback: any) => field.onChange(callback())}
        items={options}
        placeholder={placeholder}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        listMode={displayOptionsMode}
        style={{
          ...styles.selector,
          ...(errorMsg ? styles.underLineError : styles.underLineNotFocus),
        }}
        modalTitle={placeholder}
        modalContentContainerStyle={styles.modalContainer}
        listItemLabelStyle={styles.listItem}
        showTickIcon={false}
        selectedItemLabelStyle={styles.selectedItemLabel}
        ListEmptyComponent={() => (
          <Text style={styles.emptyOptions}>{emptyOptionsMessage}</Text>
        )}
      />
      <InputErrorMessage message={errorMsg} />
    </View>
  );
};

export default SelectorInput;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  selector: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underLineNotFocus: {
    borderBottomColor: Colors.ultraBlack,
  },
  underLineError: {
    borderBottomColor: Colors.red,
  },
  listItem: {
    textAlign: 'center',
  },
  selectedItemLabel: {
    color: Colors.primary,
  },
  modalContainer: {
    borderRadius: vwToPixelNumber(5),
    marginHorizontal: vwToPixelNumber(5),
    marginVertical: vhToPixelNumber(15),
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  emptyOptions: {
    textAlign: 'center',
    paddingVertical: vhToPixelNumber(1),
  },
});
