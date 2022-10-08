import { View } from 'react-native'
import React, { useState } from 'react'
import { ISwipeableProps } from './ISwipeableProps'
import EStyleSheet from 'react-native-extended-stylesheet'
import { EStyleSheetBuilder } from '~/constants'

const Swipeable = ({
  children,
  style,
  swipeDistance = 20,
  onSwipeLeft = () => { },
  onSwipeRight = () => { },
}: ISwipeableProps) => {
  const [touch, setTouch] = useState(0)
  return (
    <View
      onTouchStart={e => setTouch(e.nativeEvent.pageX)}
      onTouchEnd={e => {
        if (touch - e.nativeEvent.pageX > swipeDistance) onSwipeLeft();
        if (e.nativeEvent.pageX - touch > swipeDistance) onSwipeRight();
      }}
      style={{ ...styles.swipeContainer, ...style }}
    >
      {children}
    </View>
  )
}

export default Swipeable

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  swipeContainer: {
    flex: 1,
    width: '100%'
  },
})