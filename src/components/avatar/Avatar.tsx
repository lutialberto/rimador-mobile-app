import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { EStyleSheetBuilder } from '~/constants'
import { vwToPixelNumber } from '~/constants/EStyleSheetBuilder'

const Avatar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>K</Text>
    </View>
  )
}

export default Avatar

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  container: {
    aspectRatio: 1,
    width: vwToPixelNumber(20),
    borderRadius: vwToPixelNumber(10),
    borderWidth: 4,
    borderColor: '$colorWhite',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorGreen'
  },
  text: {
    fontSize: 25,
    color: '$colorWhite',
    fontWeight: '700'
  }
})