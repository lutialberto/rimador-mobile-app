import React, { useEffect, useState } from 'react'
import ScreenContainer from '~/components/containers/screenContainer/ScreenContainer'
import GenericHeader from '~/components/headers/genericHeader/GenericHeader'
import EStyleSheet from 'react-native-extended-stylesheet'
import { EStyleSheetBuilder } from '~/constants'
import Swipeable from '~/components/containers/swipeable/Swipeable'
import PlayerList from './components/playerList/PlayerList'
import SwipeOption from './components/swipeOption/SwipeOption'
import Button from '~/components/buttons/button/Button'
import CountDownButton from '~/components/buttons/countDownButton/CountDownButton'
import { getSwipeOptionsArtistsData } from './services/swipeService'
import { handleCustomError } from '~/utils/ErrorHandler'
import { SwipeOptionResponse } from './models/SwipeOption'
import { useListSelector } from './hooks/useListSelector'
import { Alert, Text } from 'react-native'
import RoundResultMessage from './components/roundResultMessage/RoundResultMessage'

const SWIPE_LIMIT = 1;

const SwipeScreen = () => {
  const [swipeState, setSwipeState] = useState(SWIPE_LIMIT + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [startCountDown, setStartCountDown] = useState(true);
  const [showSwipeOptionValues, setShowSwipeOptionValues] = useState(false);

  const [counter, setCounter] = useState({
    value: 0,
    resetedCounter: true,
    failedPreviousRound: false
  });

  const {
    changeNewSelectedItems,
    getSelectedItem,
    saveLoadedList,
    addMoreItems,
    needsReload
  } = useListSelector<SwipeOptionResponse>();

  useEffect(() => {
    setIsLoading(true);
    getSwipeOptionsArtistsData()
      .then(response => {
        if (response.length > 1) saveLoadedList(response);
      })
      .catch(error => handleCustomError(error, 'No se pudieron cargar los opciones.'))
      .finally(() => setIsLoading(false));

  }, [])

  useEffect(() => {
    if (needsReload) {
      getSwipeOptionsArtistsData()
        .then(response => {
          if (response.length > 1) addMoreItems(response)
        })
    }
  }, [needsReload])


  const handleSwipe = (swipe: number) => {
    if (swipeEnabled) {
      setSwipeState(prev => {
        if (swipe === 1 && prev === SWIPE_LIMIT) return prev;
        if (swipe === 1 && prev <= SWIPE_LIMIT) return prev + 1;
        if (swipe === -1 && prev === -SWIPE_LIMIT) return prev;
        if (swipe === -1 && prev >= -SWIPE_LIMIT) return prev - 1;
        return prev > SWIPE_LIMIT ? swipe : prev + swipe;
      })
    }
  }

  const lockSelectedAnswer = () => {
    const firstValue = getSelectedItem('first').value;
    const secondValue = getSelectedItem('second').value;
    let answeredCorrectly = getRoundResult(firstValue, secondValue, swipeState);

    const newCounter = answeredCorrectly ? counter.value + 1 : 0;
    setCounter({
      value: newCounter,
      failedPreviousRound: !answeredCorrectly,
      resetedCounter: newCounter === 0
    });

    setSwipeEnabled(false);
    setStartCountDown(false);
    setShowSwipeOptionValues(true);
  };

  const getRoundResult = (firstValue: number, secondValue: number, selectedResult: number) => {
    return (
      (firstValue > secondValue && selectedResult < 0) ||
      (firstValue < secondValue && selectedResult > 0) ||
      (firstValue === secondValue && selectedResult === 0)
    );
  }

  const startNewGuess = () => {
    let isNextRefreshPosible = true;
    if (!counter.failedPreviousRound) {
      if (swipeState < 0) isNextRefreshPosible = changeNewSelectedItems('keepFirst');
      if (swipeState > 0) isNextRefreshPosible = changeNewSelectedItems('keepSecond');
      if (swipeState === 0) isNextRefreshPosible = changeNewSelectedItems('keepNone');
    }
    else {
      isNextRefreshPosible = changeNewSelectedItems('keepNone');
    }

    if (isNextRefreshPosible) {
      setSwipeEnabled(true);
      setStartCountDown(true);
      setShowSwipeOptionValues(false);
    }
    else {
      Alert.alert('No hay más opciones cargadas');
    }
  }

  return (
    <ScreenContainer>
      <GenericHeader title={`Swipe ${counter.value}`} />
      {isLoading ? <Text>Loading...</Text> :
        <Swipeable
          onSwipeLeft={() => handleSwipe(-SWIPE_LIMIT)}
          onSwipeRight={() => handleSwipe(SWIPE_LIMIT)}
          style={styles.swipeContainer}
        >
          <SwipeOption
            orientation='left'
            text={getSelectedItem('first')?.text}
            imgSource={getSelectedItem('first')?.imgUri}
            value={getSelectedItem('first')?.value}
            showValue={showSwipeOptionValues}
          />
          <SwipeOption
            orientation='right'
            text={getSelectedItem('second')?.text}
            imgSource={getSelectedItem('second')?.imgUri}
            value={getSelectedItem('second')?.value}
            showValue={showSwipeOptionValues}
          />
          <PlayerList swipeState={swipeState} />
          <RoundResultMessage
            answeredCorrectly={!counter.failedPreviousRound}
            score={counter.value}
            visible={showSwipeOptionValues}
          />
        </Swipeable>
      }
      {showSwipeOptionValues ?
        <Button label='Siguiente ronda' onPress={startNewGuess} />
        : <CountDownButton
          label='Tiempo restante'
          onPress={lockSelectedAnswer}
          seconds={45}
          startCountDown={startCountDown}
          handleCountDownFinished={lockSelectedAnswer}
        />
      }
    </ScreenContainer>
  )
}

export default SwipeScreen

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  swipeContainer: {
    flexDirection: 'row',
  },
})