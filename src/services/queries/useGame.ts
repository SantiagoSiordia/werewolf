import { getGame, QUERIES } from '@services';
import { useQuery } from 'react-query';

export const useGame = (
    gameId: string
  ) => {
    return useQuery(QUERIES.GAME, () => getGame(gameId), {
      staleTime: 30000,
    });
}