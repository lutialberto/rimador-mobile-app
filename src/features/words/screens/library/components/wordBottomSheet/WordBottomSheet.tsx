import {View} from 'react-native';
import React from 'react';
import BottomSheet from '~/components/bottomSheets/bottomSheet/BottomSheet';
import BorderButton from '~/components/buttons/borderButton/BorderButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import TextInputApp from '~/components/inputs/textInput/TextInputApp';
import {useForm} from 'react-hook-form';
import {WordBottomSheetProps} from './WordBottomSheetProps';
import {FormValues} from '~/components/inputs/models/FormValues';
import {vwToPixelNumber} from '~/constants/EStyleSheetBuilder';

const WordBottomSheet = ({
  visible,
  setVisible,
  fetchWords,
}: WordBottomSheetProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    resetField,
    reset,
    setFocus,
  } = useForm({
    defaultValues: {
      length: '',
      prefix: '',
      sufix: '',
    },
    mode: 'onSubmit',
  });

  const handleFormData = (data: FormValues) => {
    setVisible(false);
    fetchWords({
      length: Number.parseInt(data.length),
      prefix: data.prefix,
      sufix: data.sufix,
    });
  };

  const handleClearFilters = () => reset();

  return (
    <BottomSheet setVisible={setVisible} visible={visible}>
      <View style={styles.mainContainer}>
        <View>
          <TextInputApp
            name="length"
            label="Cantidad de letras"
            placeholder={'Ingresa cantidad de letras...'}
            control={control}
            rules={{
              validate: {
                containsDigit: v =>
                  v.length === 0 || /\d/.test(v.toString())
                    ? true
                    : 'Poner solo caracteres numéricos',
              },
            }}
            type="numeric"
            errorMsg={errors.length?.message}
            clearInput={() => resetField('length')}
            onSubmitInput={() => setFocus('prefix')}
          />
          <TextInputApp
            name="prefix"
            label="Prefijo"
            placeholder={'Ingresa prefijo...'}
            control={control}
            errorMsg={errors.prefix?.message}
            clearInput={() => resetField('prefix')}
            onSubmitInput={() => setFocus('sufix')}
          />
          <TextInputApp
            name="sufix"
            label="Sufijo"
            placeholder={'Ingresa sufijo...'}
            control={control}
            errorMsg={errors.sufix?.message}
            clearInput={() => resetField('sufix')}
            onSubmitInput={handleSubmit(handleFormData)}
            lastInputForm={true}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <BorderButton
            label="Aplicar filtros"
            onPress={handleSubmit(handleFormData)}
            containerStyle={{flexShrink: 1}}
          />
          <BorderButton
            label="Limpiar filtros"
            onPress={handleClearFilters}
            containerStyle={{flexShrink: 1}}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default WordBottomSheet;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  mainContainer: {
    margin: vwToPixelNumber(1),
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
