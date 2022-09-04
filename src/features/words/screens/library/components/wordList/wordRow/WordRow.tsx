import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {EStyleSheetBuilder, RowProps} from '~/constants';
import {IWord} from '~/features/words/models/words/IWord';
import EStyleSheet from 'react-native-extended-stylesheet';

const WordRow = ({item, onPress = () => {}}: RowProps<IWord>) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default WordRow;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 5,
  },
});
