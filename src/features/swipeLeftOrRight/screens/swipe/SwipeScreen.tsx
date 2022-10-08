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
import { getSwipeOptionsData } from './services/swipeService'
import { handleCustomError } from '~/utils/ErrorHandler'
import { SwipeOptionResponse } from './models/SwipeOption'
import { Text } from 'react-native-svg'
import { useListSelector } from './hooks/useListSelector'
import { Alert } from 'react-native'

const SWIPE_LIMIT = 1;

const SwipeScreen = () => {
  const [swipeState, setSwipeState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [startCountDown, setStartCountDown] = useState(true);
  const [showSwipeOptionValues, setShowSwipeOptionValues] = useState(false);
  const [counter, setCounter] = useState(0);

  const {
    changeNewSelectedItems,
    getSelectedItem,
    saveLoadedList,
    addMoreItems,
    needsReload
  } = useListSelector<SwipeOptionResponse>();

  useEffect(() => {
    setIsLoading(true);
    getSwipeOptionsData()
      .then(response => {
        if (response.length > 1) {
          saveLoadedList(response);
        }
      })
      .catch(error => handleCustomError(error, 'No se pudieron cargar los opciones.'))
      .finally(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    if (needsReload) {
      getSwipeOptionsData()
        .then(response => {
          if (response.length > 1) {
            addMoreItems(response)
          }
        });
    }
  }, [needsReload])


  const handleSwipe = (swipe: number) => {
    if (swipeEnabled) {
      setSwipeState(prev => {
        if (swipe === 1 && prev === SWIPE_LIMIT) return prev;
        if (swipe === -1 && prev === -SWIPE_LIMIT) return prev;
        return prev + swipe;
      })
    }
  }

  const handleCountDownPress = () => {
    setSwipeEnabled(false);
    setStartCountDown(false);
    setShowSwipeOptionValues(true);
  };

  const startNewGuess = () => {
    const firstValue = getSelectedItem('first').value;
    const secondValue = getSelectedItem('second').value;

    let isNextRefreshPosible = true;
    let answeredCorrectly = false;

    if (firstValue > secondValue && swipeState === -1) {
      isNextRefreshPosible = changeNewSelectedItems('keepFirst');
      answeredCorrectly = true;
    };
    if (firstValue < secondValue && swipeState === 1) {
      isNextRefreshPosible = changeNewSelectedItems('keepSecond')
      answeredCorrectly = true;
    };
    if (firstValue === secondValue || !answeredCorrectly) {
      isNextRefreshPosible = changeNewSelectedItems('keepNone');
      answeredCorrectly = firstValue === secondValue && swipeState === 0;
    }

    const newCounter = answeredCorrectly ? counter + 1 : 0;
    setCounter(newCounter);

    if (isNextRefreshPosible) {
      setSwipeEnabled(true);
      setStartCountDown(true);
      setShowSwipeOptionValues(false);
    }
    else {
      Alert.alert('No hay más opciones cargadas')
    }
  }

  return (
    <ScreenContainer>
      <GenericHeader title={`Swipe ${counter}`} />
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
        </Swipeable>
      }
      {showSwipeOptionValues ?
        <Button label='Siguiente ronda' onPress={startNewGuess} />
        : <CountDownButton
          label='Tiempo restante'
          onPress={handleCountDownPress}
          seconds={45}
          startCountDown={startCountDown}
          handleCountDownFinished={handleCountDownPress}
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