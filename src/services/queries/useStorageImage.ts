import { QUERIES } from '@services';
import { useQuery } from 'react-query';
import { getDownloadURL } from '../storage';

export const useStorageImage = (ref: string) => {
    return useQuery(QUERIES.IMAGE, () => getDownloadURL(ref), {
      staleTime: 30000,
    });
}