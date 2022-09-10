import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenContainer from '~/components/containers/screenContainer/ScreenContainer';
import EStyleSheet from 'react-native-extended-stylesheet';
import {EStyleSheetBuilder} from '~/constants';
import {IWord} from '../../models/words/IWord';
import WordRow from './components/wordList/wordRow/WordRow';
import WordsListHeader from './components/wordList/wordsListHeader/WordsListHeader';
import NoData from '~/components/lists/noData/NoData';
import {getWords} from '../../services/wordService';
import {useNavigation} from '@react-navigation/native';
import {RootScreenNavigationType} from '~/navigators/routes/RootStack';
import WordBottomSheet from './components/wordBottomSheet/WordBottomSheet';
import {IWordFilters} from '../../models/IWordFilters';
import Card from '~/components/containers/card/Card';
import {vhToPixelNumber, vwToPixelNumber} from '~/constants/EStyleSheetBuilder';
import GenericHeader from '~/components/headers/genericHeader/GenericHeader';

const LibraryScreen = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<RootScreenNavigationType>();

  const fetchWords = async (filters?: IWordFilters) => {
    const wordsResponse = await getWords(filters);
    setWords(wordsResponse);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleRowPress = (word: IWord) => {
    navigation.navigate('Words/Detail', {
      id: word.id,
    });
  };

  return (
    <ScreenContainer>
      <GenericHeader title="LibraryScreen" />
      <Card style={styles.card}>
        <View style={styles.fContainer}>
          <FlatList
            data={words}
            ListEmptyComponent={() => <NoData />}
            ListHeaderComponent={() => (
              <WordsListHeader
                openFilterPanel={() => setModalVisible(true)}
                matchedWordsCount={words.length}
              />
            )}
            renderItem={word => (
              <WordRow item={word.item} onPress={handleRowPress} />
            )}
          />
        </View>
      </Card>
      <WordBottomSheet
        visible={modalVisible}
        setVisible={setModalVisible}
        fetchWords={fetchWords}
      />
    </ScreenContainer>
  );
};

export default LibraryScreen;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  fContainer: {
    maxHeight: vhToPixelNumber(40),
  },
  card: {
    margin: vwToPixelNumber(2),
  },
});
