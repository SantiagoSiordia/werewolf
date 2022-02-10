import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeInAsyncStorage = async (storageKey: string, value: string | Record<string, string>) => {
    try {
        if(typeof value === "object") await AsyncStorage.setItem(storageKey, JSON.stringify(value))
        else await AsyncStorage.setItem(storageKey, value)
    } catch (error) {
        console.log(error)
    }
}

export const getDataFromAsyncStorage = async (storageKey: string) => {
    try {
        const value = await AsyncStorage.getItem(storageKey)
        if(value !== null) return JSON.parse(value)
        return null;
    } catch (error) {
        console.log(error)
    }
}