import { getDataFromAsyncStorage, QUERIES } from '@services';
import { useQuery } from 'react-query';

const getGameKey = async () => {
    return await getDataFromAsyncStorage(QUERIES.GAME_KEY)
}

export const useGameKey = () => {
    return useQuery(QUERIES.GAME_KEY, getGameKey, {
      staleTime: 30000,
    });
}