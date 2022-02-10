import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeInAsyncStorage = async (storageKey: string, value: string | Record<string, string>) => {
    try {
        if(typeof value === "object") await AsyncStorage.setItem(storageKey, JSON.stringify(value));
        else await AsyncStorage.setItem(storageKey, value);
    } catch (error) {
        throw error
    }
}

export const getDataFromAsyncStorage = async (storageKey: string) => {
    try {
        const value = await AsyncStorage.getItem(storageKey)
        if(value !== null) return value
        return null;
    } catch (error) {
        throw error
    }
}

export const removeItemFromAsyncStorage = async (storageKey: string) => {
    try {
        await AsyncStorage.removeItem(storageKey)
    } catch(error) {
        throw error
    }
}