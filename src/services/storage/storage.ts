
import storage from '@react-native-firebase/storage';

export const getDownloadURL = async (ref: string) => {
    try {
        return await storage().ref(`${ref}.jpeg`).getDownloadURL();
    } catch (error) {
        throw error;
    }
}