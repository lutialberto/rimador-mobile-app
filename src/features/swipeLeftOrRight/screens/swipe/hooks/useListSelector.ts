import {useEffect, useState} from 'react';

type REFRESH_MODES = 'keepFirst' | 'keepSecond' | 'keepNone';

export const useListSelector = <T>() => {
  const [listLoaded, setListLoaded] = useState<T[]>([]);
  const [selectedItemsIndex, setSelectedItemsIndex] = useState<number[]>([]);
  const [selectedMode, setSelectedMode] = useState<REFRESH_MODES>('keepFirst');
  const [isNextRefreshPosible, setIsNextRefreshPosible] = useState(true);

  useEffect(() => {
    const maxcurrentIndex = getMaxSelectedIndex();

    const minimunItemsNeededForNextRefresh =
      selectedMode === 'keepFirst' || selectedMode === 'keepSecond' ? 1 : 2;
    const maxIndexOnNextRefresh =
      maxcurrentIndex + minimunItemsNeededForNextRefresh;
    const isNextRefreshPosible1 =
      listLoaded.length - 1 >= maxIndexOnNextRefresh;

    setIsNextRefreshPosible(isNextRefreshPosible1);
  }, [listLoaded, selectedMode, selectedItemsIndex]);

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

  const changeNewSelectedItems = () => {
    if (!isNextRefreshPosible) return;

    const maxCurrentIndex = getMaxSelectedIndex();

    let firstItem = selectedItemsIndex[0];
    let secondItem = selectedItemsIndex[1];

    switch (selectedMode) {
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
  };

  return {
    saveLoadedList,
    getSelectedItem,
    setSelectedMode,
    changeNewSelectedItems,
    isNextRefreshPosible,
  };
};
