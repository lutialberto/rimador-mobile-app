import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoBackButton from '~/components/buttons/goBackButton/GoBackButton';
import {useRoute} from '@react-navigation/native';
import {WordDetailScreenRouteProp} from '~/navigators/routes/RootStack';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {getWordDetail} from '../../services/wordService';
import {IWord} from '../../models/words/IWord';

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
    <View>
      <Text>WordDetailScreen</Text>
      <Text>id : {route.params?.id}</Text>
      <Text>{word?.name}</Text>
      <GoBackButton />
    </View>
  );
};

export default WordDetailScreen;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({});
