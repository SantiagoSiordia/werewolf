import { useQuery } from 'react-query';
import { getGame } from '../cloud-firestore';
import { QUERIES } from './QUERIES';

export const useGame = (
    gameId: string
  ) => {
    return useQuery(QUERIES.GAMES, () => getGame("gameId"), {
      staleTime: 30000,
    });
}