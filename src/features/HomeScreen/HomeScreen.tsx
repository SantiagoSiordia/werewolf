import React, { FC } from "react";
import { Text, View } from "react-native";
import { useGameKey } from "~/src/services";
import { LoadingScreen } from "../LoadingScreen";
import { CreateNewGame, GameState } from "./components";

export const HomeScreen: FC = () => {

    const { data: gameKey, isLoading: isLoadingGameKey, isError: isGameKeyError } = useGameKey();

    if(isLoadingGameKey) return <LoadingScreen message="Hello" />

    if(isGameKeyError) return <View>
        <Text>is error</Text>
    </View>

    if(gameKey === null || gameKey === undefined) return <CreateNewGame />

    return <GameState gameKey={gameKey} />
}