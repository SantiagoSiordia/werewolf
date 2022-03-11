import firestore from '@react-native-firebase/firestore';
import { COLLECTIONS } from './COLLECTIONS';

export declare type RoleNamesRef = 'wolf' | 'seer' | 'hunter' | 'bodyguard' | 'villager' | 'wolf cub'

export declare interface RoleCloudFirestore {
    name: RoleNamesRef,
    points: number,
    ref: RoleNamesRef
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

export const setGame = async (gameId: string, game: Game) => {
    try {
        await firestore().collection(COLLECTIONS.GAMES)
            .doc(gameId)
            .update({
                ...game
            });
    } catch (error) {
        throw error
    }
}