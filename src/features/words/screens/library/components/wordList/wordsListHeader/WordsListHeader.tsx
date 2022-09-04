import {Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import IconButton from '~/components/buttons/IconButton/IconButton';
import {WordListHeaderProps} from './WordsListHeaderProps';

const WordsListHeader = ({
  openFilterPanel,
  matchedWordsCount,
}: WordListHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Palabras encontradas: {matchedWordsCount}</Text>
        <IconButton
          svgIcon={<Text>Abrir panel de filtros</Text>}
          onPress={openFilterPanel}
        />
      </View>
      {matchedWordsCount > 0 && (
        <View>
          <Text>Nombre</Text>
        </View>
      )}
    </View>
  );
};

export default WordsListHeader;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    width: '100%',
  },
});
