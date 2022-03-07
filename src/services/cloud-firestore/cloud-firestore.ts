import firestore from '@react-native-firebase/firestore';
import { COLLECTIONS } from './COLLECTIONS';

export interface RoleCloudFirestore {
    name: string,
    points: number,
    ref: string
    image: string;
    maxPerGame?: number;
    minPerGame?: number;
}

export const getGame = async (gameId: string) => {
    try {
        const collectionsResponse = await firestore().collection(COLLECTIONS.GAMES).doc(gameId).get();
        return collectionsResponse.data() as Game
    } catch (error) {
        throw error
    }
}

export const getRoles = async () => {
    try {
        const rolesResponse = await firestore().collection(COLLECTIONS.ROLES).get();
        let allRoles: Array<RoleCloudFirestore> = [];
        rolesResponse.forEach(role => {
            allRoles.push(role.data() as RoleCloudFirestore)
        })
        return allRoles;
    } catch (error) {
        throw error
    }
}

export const getRole = async (roleRef: string) => {
    try {
        const roleResponse = await firestore().collection(COLLECTIONS.ROLES).doc(roleRef).get();
        return roleResponse.data() as RoleCloudFirestore;
    } catch (error) {
        throw error
    }
}