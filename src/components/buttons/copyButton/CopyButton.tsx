import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {CopyButtonProps} from './CopyButtonProps';
import Clipboard from '@react-native-clipboard/clipboard';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, EStyleSheetBuilder} from '~/constants';
import CopyIcon from './assets/copy.svg';

const CopyButton = ({textToCopy, children}: CopyButtonProps) => {
  const copyToClipboard = () => {
    Clipboard.setString(textToCopy);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={copyToClipboard}>
      {children}
      <CopyIcon fill={Colors.gray} />
    </TouchableOpacity>
  );
};

export default CopyButton;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 10,
  },
});
