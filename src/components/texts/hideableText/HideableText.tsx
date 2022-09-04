import {Text} from 'react-native';
import React from 'react';
import {HideableTextProps} from './HideableTextProps';

const HideableText = ({
  content,
  hideContent,
  style,
  replaceWithSymbol = '*',
}: HideableTextProps) => {
  return (
    <Text style={style}>
      {hideContent ? content.replace(/(\w|^\w)/g, replaceWithSymbol) : content}
    </Text>
  );
};

export default HideableText;
