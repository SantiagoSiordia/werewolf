import { ErrorScreen, LoadingScreen, useAppTranslation } from "@features";
import { useGameKey } from "@services";
import React, { FC } from "react";
import { GoCreateNewGame, Settings } from "../components";

export const SettingsLogic: FC = () => {

    const { data: gameKey, isLoading: isGameKeyLoading, isError: isGameKeyError } = useGameKey();

    const { t } = useAppTranslation();

    if(isGameKeyLoading) return <LoadingScreen message={t("general purpose.game key")} />

    if(isGameKeyError) return <ErrorScreen message={t("error.keys.gameKey")} />

    if(gameKey === null || gameKey === undefined) return <GoCreateNewGame />

    return <Settings gameKey={gameKey} />
}