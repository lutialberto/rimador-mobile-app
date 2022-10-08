import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IPlayerListProps } from './IPlayerListProps'
import Avatar from '~/components/avatar/Avatar'
import EStyleSheet from 'react-native-extended-stylesheet';
import { EStyleSheetBuilder } from '~/constants';
import { PlayerSwipeState } from '../../models/PlayerSwipeState';
import { getSwipePlayersData } from '../../services/swipeService';

const PlayerList = ({ swipeState }: IPlayerListProps) => {
  const [players, setPlayers] = useState<PlayerSwipeState[]>([]);

  useEffect(() => {
    setPlayers(prev =>
      prev.map(p => p.handledByUser ? { ...p, swipe: swipeState } : p)
    )
  }, [swipeState])

  useEffect(() => {
    const response = getSwipePlayersData();
    setPlayers(response);
  }, []);

  return (
    <View style={styles.center}>
      {
        players.map(p => {
          const itemStyle2 = p.swipe > 0 ?
            styles.itemRight :
            p.swipe < 0 ?
              styles.itemLeft :
              {}
            ;

          return (
            <View style={{ ...styles.item, ...itemStyle2 }} key={p.id}>
              <Avatar />
            </View>
          )
        })
      }
    </View>
  );
}

export default PlayerList;

EStyleSheet.build(EStyleSheetBuilder);
const styles = EStyleSheet.create({
  center: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly'
  },
  item: {
    width: '100%',
    alignItems: 'center',
  },
  itemLeft: {
    alignItems: 'flex-start'
  },
  itemRight: {
    alignItems: 'flex-end'
  },
});