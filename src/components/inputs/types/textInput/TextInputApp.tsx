import {TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, EStyleSheetBuilder} from '~/constants';
import {TextInputAppProps} from './TextInputAppProps';
import InputErrorMessage from '../../sharedComponents/inputErrorMessage/InputErrorMessage';
import IconButton from '~/components/buttons/IconButton/IconButton';
import {useController} from 'react-hook-form';
import InputLabel from '../../sharedComponents/inputLabel/InputLabel';
import ClearIcon from './assets/inputClear.svg';
import ViewOn from './assets/viewPasswordOn.svg';
import ViewOff from './assets/viewPasswordOff.svg';

const TextInputApp = ({
  label,
  errorMsg,
  onSubmitInput = () => {},
  placeholder = '',
  lastInputForm = false,
  type,
  clearInput,
  ...props
}: TextInputAppProps) => {
  const {field} = useController(props);

  const [clearInputVisible, setClearInputVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(type === 'password');

  useEffect(() => {
    if (field.value && !clearInputVisible) {
      setClearInputVisible(true);
    }
    if (!field.value && clearInputVisible) {
      setClearInputVisible(false);
    }
  }, [field.value, clearInputVisible]);

  const setKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'numeric':
        return 'decimal-pad';
      default:
        return 'default';
    }
  };

  const renderPasswordIcon = () =>
    type === 'password' && (
      <IconButton
        onPress={() => setPasswordHidden((prev: boolean) => !prev)}
        svgIcon={
          passwordHidden ? (
            <ViewOn fill={Colors.gray} />
          ) : (
            <ViewOff fill={Colors.gray} />
          )
        }
      />
    );

  return (
    <View style={styles.container}>
      <InputLabel label={label} />
      <View
        style={{
          ...styles.inputContainer,
          ...(isFocused
            ? styles.underLineFocus
            : errorMsg
            ? styles.underLineError
            : styles.underLineNotFocus),
        }}>
        <TextInput
          keyboardType={setKeyboardType()}
          returnKeyType={lastInputForm ? 'default' : 'next'}
          blurOnSubmit={lastInputForm}
          onSubmitEditing={onSubmitInput}
          ref={field.ref}
          value={typeof field.value == 'string' ? field.value : ''}
          placeholder={placeholder}
          autoCorrect={false}
          onChangeText={field.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            field.onBlur();
            setIsFocused(false);
          }}
          secureTextEntry={passwordHidden}
        />
        <View style={styles.iconsContainer}>
          <IconButton
            onPress={clearInput}
            visible={field.value.toString().length > 0}
            svgIcon={<ClearIcon fill={Colors.gray} />}
          />
          {renderPasswordIcon()}
        </View>
      </View>
      <InputErrorMessage message={errorMsg} />
    </View>
  );
};

export default TextInputApp;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    width: '100%',
    minHeight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '$colorBlack',
  },
  underLineNotFocus: {
    borderBottomColor: '$colorBlack',
  },
  underLineFocus: {
    borderBottomColor: '$colorPrimary',
  },
  underLineError: {
    borderBottomColor: '$colorRed',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
});
