import {Modal, TouchableOpacity, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, EStyleSheetBuilder} from '~/constants';
import {BottomSheetProps} from './BottomSheetProps';
import IconButton from '~/components/buttons/IconButton/IconButton';
import KeyboardHandler from '~/components/inputs/keyboardHandler/KeyboardHandler';
import {vwToPixelNumber} from '~/constants/EStyleSheetBuilder';
import CloseIcon from './assets/closeSheet.svg';

const BottomSheet = ({
  visible,
  setVisible,
  children,
  keyboardVerticalOffset = 0,
}: BottomSheetProps) => {
  const onClose = () => setVisible(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <KeyboardHandler keyboardVerticalOffset={keyboardVerticalOffset}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.transparent}></TouchableOpacity>
          <View style={{...styles.modalView}}>
            <View style={styles.header}>
              <IconButton
                svgIcon={<CloseIcon fill={Colors.gray} />}
                onPress={onClose}
              />
            </View>
            <View style={styles.body}>{children}</View>
          </View>
        </KeyboardHandler>
      </View>
    </Modal>
  );
};

export default BottomSheet;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  transparent: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: vwToPixelNumber(5),
    borderTopRightRadius: vwToPixelNumber(5),
    padding: vwToPixelNumber(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'flex-end',
    width: '100%',
  },
  body: {
    width: '100%',
  },
});
