import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BorderButton from '~/components/buttons/borderButton/BorderButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {BottomSheetProps} from './BottomSheetProps';
import IconButton from '~/components/buttons/IconButton/IconButton';
import KeyboardHandler from '~/components/inputs/keyboardHandler/KeyboardHandler';
import {vwToPixelNumber} from '~/constants/EStyleSheetBuilder';

const BottomSheet = ({
  visible,
  setVisible,
  children,
  flex = 1,
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
              <IconButton svgIcon={<Text>close</Text>} onPress={onClose} />
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
