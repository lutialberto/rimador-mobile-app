import {useState} from 'react';

type REFRESH_MODES = 'keepFirst' | 'keepSecond' | 'keepNone';

export const useListSelector = <T>() => {
  const [listLoaded, setListLoaded] = useState<T[]>([]);
  const [selectedItemsIndex, setSelectedItemsIndex] = useState<number[]>([]);

  const isNextRefreshPosible = (mode: REFRESH_MODES) => {
    const maxcurrentIndex = getMaxSelectedIndex();

    const minimunItemsNeededForNextRefresh =
      mode === 'keepFirst' || mode === 'keepSecond' ? 1 : 2;
    const maxIndexOnNextRefresh =
      maxcurrentIndex + minimunItemsNeededForNextRefresh;
    return listLoaded.length - 1 >= maxIndexOnNextRefresh;
  };

  const getMaxSelectedIndex = () =>
    Math.max(selectedItemsIndex[0], selectedItemsIndex[1]);

  const getSelectedItem = (option: 'first' | 'second') => {
    const leftOptionIndex =
      option === 'first' ? selectedItemsIndex[0] : selectedItemsIndex[1];
    return listLoaded[leftOptionIndex];
  };

  const saveLoadedList = (options: T[]) => {
    setListLoaded(options);
    setSelectedItemsIndex([0, 1]);
  };

  const changeNewSelectedItems = (mode: REFRESH_MODES): boolean => {
    if (!isNextRefreshPosible(mode)) return false;

    const maxCurrentIndex = getMaxSelectedIndex();

    let firstItem = selectedItemsIndex[0];
    let secondItem = selectedItemsIndex[1];

    switch (mode) {
      case 'keepFirst':
        secondItem = maxCurrentIndex + 1;
        break;
      case 'keepSecond':
        firstItem = maxCurrentIndex + 1;
        break;
      case 'keepNone':
        firstItem = maxCurrentIndex + 1;
        secondItem = maxCurrentIndex + 2;
        break;
    }

    setSelectedItemsIndex([firstItem, secondItem]);
    return true;
  };

  return {
    saveLoadedList,
    getSelectedItem,
    changeNewSelectedItems,
  };
};
