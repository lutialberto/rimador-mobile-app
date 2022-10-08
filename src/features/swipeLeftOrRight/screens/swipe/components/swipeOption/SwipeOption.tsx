import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ISwipeOptionProps } from './ISwipeOptionProps'
import EStyleSheet from 'react-native-extended-stylesheet';
import { EStyleSheetBuilder } from '~/constants';
import { vwToPixelNumber } from '~/constants/EStyleSheetBuilder';

const SwipeOption = ({
  orientation,
  imgSource,
  text,
  showValue,
  value
}: ISwipeOptionProps) => {
  const containerStyle = orientation === 'left' ? styles.left : styles.right;

  const renderText = () => (
    <>
      {text && <Text style={styles.text}>{text}</Text>}
      {showValue && <Text style={styles.text}>{value}</Text>}
    </>
  )

  return (
    <>
      {imgSource ?
        <ImageBackground source={{ uri: imgSource }} style={containerStyle}>
          {renderText()}
        </ImageBackground>
        :
        <View style={containerStyle}>
          {renderText()}
        </View>
      }
    </>
  )
}

export default SwipeOption

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  left: {
    backgroundColor: '$colorRed',
    flex: 1
  },
  right: {
    backgroundColor: '$colorYellow',
    flex: 1
  },
  text: {
    backgroundColor: '$colorGreen',
    padding: vwToPixelNumber(2),
    borderRadius: 10,
    marginHorizontal: '15%',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700'
  }
})