import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IRoundResultMessageProps } from './IRoundResultMessageProps'
import EStyleSheet from 'react-native-extended-stylesheet'
import { EStyleSheetBuilder } from '~/constants'
import { vwToPixelNumber } from '~/constants/EStyleSheetBuilder'

const RoundResultMessage = ({ answeredCorrectly, score, visible }: IRoundResultMessageProps) => {
  return (
    <>
      {visible &&
        <View
          style={styles.container}
        >
          <Text
            style={styles.text}
          >{answeredCorrectly ? `Ganaste la ronda! Acertaste ${score} veces seguidas` : 'Perdiste'}</Text>
        </View>
      }
    </>
  )
}

export default RoundResultMessage

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '$colorWhite',
    textAlign: 'center',
    fontSize: vwToPixelNumber(8),
    fontWeight: '700',
    padding: vwToPixelNumber(5),
    backgroundColor: '$colorYellow',
    marginHorizontal: vwToPixelNumber(20)
  }
})