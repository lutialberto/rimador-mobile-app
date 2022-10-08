import {useState} from 'react';

type REFRESH_MODES = 'keepFirst' | 'keepSecond' | 'keepNone';

export const useListSelector = <T>() => {
  const [state, setState] = useState<{
    listLoaded: T[];
    firstSelectedIndex: number;
    secondSelectedIndex: number;
    needsReload: boolean;
  }>({
    listLoaded: [],
    firstSelectedIndex: -1,
    secondSelectedIndex: -1,
    needsReload: false,
  });

  const isNextRefreshPosible = (mode: REFRESH_MODES) => {
    const maxcurrentIndex = getMaxSelectedIndex();

    const minimunItemsNeededForNextRefresh =
      mode === 'keepFirst' || mode === 'keepSecond' ? 1 : 2;
    const maxIndexOnNextRefresh =
      maxcurrentIndex + minimunItemsNeededForNextRefresh;
    return state.listLoaded.length - 1 >= maxIndexOnNextRefresh;
  };

  const getMaxSelectedIndex = () =>
    Math.max(state.firstSelectedIndex, state.secondSelectedIndex);

  const getSelectedItem = (option: 'first' | 'second') => {
    const leftOptionIndex =
      option === 'first' ? state.firstSelectedIndex : state.secondSelectedIndex;
    return state.listLoaded[leftOptionIndex];
  };

  const saveLoadedList = (listLoaded: T[]) => {
    setState({
      listLoaded,
      firstSelectedIndex: 0,
      secondSelectedIndex: 1,
      needsReload: listLoaded.length < 2,
    });
  };

  const changeNewSelectedItems = (mode: REFRESH_MODES): boolean => {
    if (!isNextRefreshPosible(mode)) return false;

    const maxCurrentIndex = getMaxSelectedIndex();

    let firstItem = state.firstSelectedIndex;
    let secondItem = state.secondSelectedIndex;

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

    setState(prev => {
      return {
        ...prev,
        firstSelectedIndex: firstItem,
        secondSelectedIndex: secondItem,
        needsReload:
          prev.listLoaded.length - 2 < Math.max(firstItem, secondItem),
      };
    });
    return true;
  };

  const addMoreItems = (newItems: T[]) => {
    const maxIndex = getMaxSelectedIndex();

    const remaining =
      maxIndex === state.listLoaded.length - 1
        ? []
        : state.listLoaded.slice(maxIndex + 1);

    const newLoadedList = [
      state.listLoaded[state.firstSelectedIndex],
      state.listLoaded[state.secondSelectedIndex],
      ...remaining,
      ...newItems,
    ];

    setState({
      listLoaded: newLoadedList,
      firstSelectedIndex: 0,
      secondSelectedIndex: 1,
      needsReload: remaining.length + newItems.length < 2,
    });
  };

  return {
    saveLoadedList,
    getSelectedItem,
    changeNewSelectedItems,
    addMoreItems,
    needsReload: state.needsReload,
  };
};
