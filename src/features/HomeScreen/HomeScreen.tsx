import React, { FC } from "react";
import { Text, View } from "react-native";
import { useGameKey } from "~/src/services/queries/useGameKey";
import { GameState } from "./components";
import { CreateNewGame } from "./components/CreateNewGame";

export const HomeScreen: FC = () => {

    const { data: gameKey, isLoading: isLoadingGameKey, isError: isGameKeyError } = useGameKey();

    if(isLoadingGameKey) return <View>
        <Text>is loading</Text>
    </View>

    if(isGameKeyError) return <View>
        <Text>is error</Text>
    </View>

    if(gameKey === null) return <CreateNewGame />

    return <GameState gameKey={gameKey} />
}