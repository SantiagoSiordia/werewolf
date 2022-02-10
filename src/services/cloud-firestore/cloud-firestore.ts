import firestore from '@react-native-firebase/firestore';

export const getGame = async (gameId: string) => {
    try {
        const response = await firestore().collection('games').doc('i3DrhFPErA8bUDU4gNKO').get();
        return response.data()
    } catch (error) {
        console.log(error)
    }
}