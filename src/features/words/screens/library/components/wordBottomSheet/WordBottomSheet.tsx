import {ScrollView, View} from 'react-native';
import React from 'react';
import BottomSheet from '~/components/bottomSheets/bottomSheet/BottomSheet';
import BorderButton from '~/components/buttons/borderButton/BorderButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import TextInputApp from '~/components/inputs/types/textInput/TextInputApp';
import {useForm} from 'react-hook-form';
import {WordBottomSheetProps} from './WordBottomSheetProps';
import {FormValues} from '~/components/inputs/models/FormValues';
import {vhToPixelNumber, vwToPixelNumber} from '~/constants/EStyleSheetBuilder';
import {onlyDigits, onlyVocalStruct} from '~/utils/ValidationRules';
import Button from '~/components/buttons/button/Button';

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
  } = useForm<FormValues>({
    defaultValues: {
      length: '',
      prefix: '',
      sufix: '',
      syllablesCount: '',
      vocalStruct: '',
      syllables: '',
      asonantRhyme: '',
      consonantRhyme: '',
    },
    mode: 'onSubmit',
  });

  const handleFormData = (data: FormValues) => {
    setVisible(false);
    fetchWords({
      length: Number.parseInt(data.length),
      prefix: data.prefix,
      sufix: data.sufix,
      syllablesCount: Number.parseInt(data.syllablesCount),
      vocalStruct: data.vocalStruct,
      syllables: data.syllables,
      asonantRhyme: data.asonantRhyme,
      consonantRhyme: data.consonantRhyme,
    });
  };

  const handleClearFilters = () => reset();

  return (
    <BottomSheet setVisible={setVisible} visible={visible}>
      <ScrollView style={styles.mainContainer}>
        <View>
          <TextInputApp
            name="length"
            label="Cantidad de letras"
            placeholder={'Ej: casa -> 4'}
            control={control}
            rules={{
              validate: {
                containsDigit: onlyDigits,
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
            placeholder={'Ej: casa -> c'}
            control={control}
            errorMsg={errors.prefix?.message}
            clearInput={() => resetField('prefix')}
            onSubmitInput={() => setFocus('sufix')}
          />
          <TextInputApp
            name="sufix"
            label="Sufijo"
            placeholder={'Ej: casa -> asa'}
            control={control}
            errorMsg={errors.sufix?.message}
            clearInput={() => resetField('sufix')}
            onSubmitInput={() => setFocus('vocalStruct')}
          />
          <TextInputApp
            name="vocalStruct"
            label="Estructura vocal"
            placeholder={'Ej: casa -> a-a'}
            control={control}
            rules={{
              validate: {
                containsDigit: onlyVocalStruct,
              },
            }}
            errorMsg={errors.vocalStruct?.message}
            clearInput={() => resetField('vocalStruct')}
            onSubmitInput={() => setFocus('syllables')}
          />
          <TextInputApp
            name="syllables"
            label="Sílabas"
            placeholder={'Ej: casa -> ca-sa'}
            control={control}
            errorMsg={errors.syllables?.message}
            clearInput={() => resetField('syllables')}
            onSubmitInput={() => setFocus('syllablesCount')}
          />
          <TextInputApp
            name="syllablesCount"
            label="Cantidad de sílabas"
            placeholder={'Ej: casa -> 2'}
            control={control}
            rules={{
              validate: {
                containsDigit: onlyDigits,
              },
            }}
            type="numeric"
            errorMsg={errors.syllablesCount?.message}
            clearInput={() => resetField('syllablesCount')}
            onSubmitInput={() => setFocus('consonantRhyme')}
          />
          <TextInputApp
            name="consonantRhyme"
            label="Rima consonante"
            placeholder={'Ej: casa -> asa'}
            control={control}
            errorMsg={errors.consonantRhyme?.message}
            clearInput={() => resetField('consonantRhyme')}
            onSubmitInput={() => setFocus('asonantRhyme')}
          />
          <TextInputApp
            name="asonantRhyme"
            label="Rima asonante"
            placeholder={'Ej: casa -> a-a'}
            control={control}
            rules={{
              validate: {
                containsDigit: onlyVocalStruct,
              },
            }}
            errorMsg={errors.asonantRhyme?.message}
            clearInput={() => resetField('asonantRhyme')}
            onSubmitInput={handleSubmit(handleFormData)}
            lastInputForm={true}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button
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
    </BottomSheet>
  );
};

export default WordBottomSheet;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  mainContainer: {
    margin: vwToPixelNumber(1),
    height: vhToPixelNumber(40),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
