import {getRequest} from '~/services/config/serviceClient';
import {SwipeOptionResponse} from '../models/SwipeOption';

export const getSwipePlayersData = () => {
  return require('../assets/swipePlayers.json');
};

export const getSwipeOptionsArtistsData = async () => {
  return getRequest<SwipeOptionResponse[]>('/search', {
    q: 'artist',
    type: 'artist',
  }).then(resJson =>
    resJson.artists.items.map((e: any) => {
      return {
        imgUri: e.images[0]?.url,
        id: e.id,
        text: e.name,
        value: e.followers.total,
      };
    }),
  );
};
