import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoBackButton from '~/components/buttons/goBackButton/GoBackButton';
import {useRoute} from '@react-navigation/native';
import {WordDetailScreenRouteProp} from '~/navigators/routes/RootStack';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {getWordDetail} from '../../services/wordService';
import {IWord} from '../../models/words/IWord';
import {
  vhPixelAspectRatio,
  vhToPixelNumber,
  vwToPixelNumber,
} from '~/constants/EStyleSheetBuilder';

const WordDetailScreen = () => {
  const route = useRoute<WordDetailScreenRouteProp>();
  const [word, setWord] = useState<IWord | undefined>(undefined);

  const fetchWordDetails = async (id: number) => {
    const response = await getWordDetail(id);
    setWord(response);
  };

  useEffect(() => {
    const id = route.params?.id;
    if (id) fetchWordDetails(id);
  }, [route.params?.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{word?.name}</Text>

      <Text>cantidad letras: {word?.length}</Text>

      <Text style={styles.subtitle}>rima</Text>
      <Text>consonante: {word?.rhyme.consonant}</Text>
      <Text>asonante: {word?.rhyme.asonant}</Text>

      <Text style={styles.subtitle}>sílabas</Text>
      <Text>{word?.syllables.value}</Text>
      <Text>cantidad: {word?.syllables.count}</Text>

      <Text style={styles.subtitle}>estructura vocal</Text>
      <Text>{word?.vocalStruct}</Text>
      <GoBackButton containerStyle={styles.goBack} />
    </View>
  );
};

export default WordDetailScreen;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: vwToPixelNumber(10),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: vwToPixelNumber(6),
    textAlign: 'center',
  },
  goBack: {
    width: '50%',
    marginTop: vhToPixelNumber(10),
  },
});
