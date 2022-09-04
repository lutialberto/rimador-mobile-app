import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconButtonProps} from './IconButtonProps';

const IconButton = ({onPress, visible = true, svgIcon}: IconButtonProps) =>
  visible ? (
    <TouchableOpacity onPress={onPress}>
      {svgIcon ? svgIcon : <Text>IconButton</Text>}
    </TouchableOpacity>
  ) : (
    <></>
  );

export default IconButton;

const styles = StyleSheet.create({});
