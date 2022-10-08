import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { EStyleSheetBuilder } from '~/constants'
import { ICountDownButtonProps } from './ICountDownButtonProps'
import Button from '../button/Button'

const CountDownButton = ({ seconds, label, startCountDown, handleCountDownFinished, ...props }: ICountDownButtonProps) => {
  const [countDown, setCountDown] = useState(seconds);

  useEffect(() => {
    if (countDown > 0 && startCountDown) {
      setTimeout(() => {
        setCountDown((prev: number) => prev - 1);
      }, 1000);
    }

    if (countDown === 0) handleCountDownFinished();
  }, [countDown, startCountDown]);

  useEffect(() => {
    if (countDown !== seconds) {
      setCountDown(seconds);
    }
  }, [seconds]);

  const renderCountDown = () => {
    if (countDown <= 0 || !startCountDown) return '';
    if (countDown > 0) {
      const minutes = Math.floor(countDown / 60);
      const seconds = countDown % 60;
      return `${minutes}:${seconds}s`;
    }
  };

  return (
    <Button {...props} label={`${label} ${renderCountDown()}`} />
  )
}

export default CountDownButton

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
})