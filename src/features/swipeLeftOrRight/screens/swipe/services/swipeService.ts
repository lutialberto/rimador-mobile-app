import {SwipeOptionResponse} from '../models/SwipeOption';

export const getSwipePlayersData = () => {
  return require('../assets/swipePlayers.json');
};

export const getSwipeOptionsData = async (): Promise<SwipeOptionResponse[]> => {
  return await require('../assets/swipeOptions.json');
};
