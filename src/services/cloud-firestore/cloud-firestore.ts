import firestore from '@react-native-firebase/firestore';

export interface Player {
    name: string;
    role: string;
}

export interface Game {
    moderator: string;
    players: Array<Player>
}

export const getGame = async (gameId: string) => {
    try {
        const response = await firestore().collection('games').doc(gameId).get();
        return response.data() as Game
    } catch (error) {
        throw error
    }
}