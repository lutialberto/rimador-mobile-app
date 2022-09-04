import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React from 'react';
import {KeyboardHandlerProps} from './KeyboardHandlerProps';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';

const KeyboardHandler = ({
  children,
  keyboardVerticalOffset,
}: KeyboardHandlerProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.flex}>
      <Pressable style={styles.flex} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default KeyboardHandler;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  flex: {
    flex: 1,
  },
});
