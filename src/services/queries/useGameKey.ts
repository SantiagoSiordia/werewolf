import { useQuery } from 'react-query';
import { getDataFromAsyncStorage } from '../async-storage';
import { QUERIES } from './QUERIES';

const getGameKey = async () => {
    return await getDataFromAsyncStorage(QUERIES.GAME_KEY)
}

export const useGameKey = () => {
    return useQuery(QUERIES.GAME_KEY, getGameKey, {
      staleTime: 30000,
    });
}