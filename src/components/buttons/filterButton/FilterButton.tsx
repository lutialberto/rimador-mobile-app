import React from 'react';
import IconButton from '../IconButton/IconButton';
import {IconButtonProps} from '../IconButton/IconButtonProps';
import {Colors} from '~/constants';
import FilterIcon from './assets/filter.svg';

const FilterButton = ({visible, onPress}: IconButtonProps) => {
  return (
    <IconButton
      onPress={onPress}
      visible={visible}
      svgIcon={<FilterIcon fill={Colors.gray} />}
    />
  );
};

export default FilterButton;
