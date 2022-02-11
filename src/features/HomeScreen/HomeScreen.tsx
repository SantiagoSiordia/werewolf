import { ErrorScreen, LoadingScreen, useAppTranslation } from "@features";
import { useGameKey } from "@services";
import React, { FC } from "react";
import { CreateNewGame, GameState } from "./components";

export const HomeScreen: FC = () => {

    const { data: gameKey, isLoading: isLoadingGameKey, isError: isGameKeyError } = useGameKey();

    const { t } = useAppTranslation();

    if(isLoadingGameKey) return <LoadingScreen message={t("general purpose.game key")} />

    if(isGameKeyError) return <ErrorScreen message={t("error.keys.gameKey")} />

    if(gameKey === null || gameKey === undefined) return <CreateNewGame />

    return <GameState gameKey={gameKey} />
}