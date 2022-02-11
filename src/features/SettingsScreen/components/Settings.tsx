import React, { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { WwButton } from "~/src/components";
import { useGame } from "~/src/services";
import { ErrorScreen, LoadingScreen, useAppTranslation } from "../..";

export interface SettingsProps {
    gameKey: string;
}

export const Settings: FC<SettingsProps> = ({
    gameKey
}) => {

    const { t } = useAppTranslation();

    const { data: game, isLoading: isGameLoading, isError: isGameError } = useGame(gameKey);

    if(isGameLoading) return <LoadingScreen message={t("general purpose.game")} />

    if(isGameError) return <ErrorScreen message={t("error.keys.game")} />

    if(game == undefined) return null;

    return <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t("settings.players")}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.text}>{t("settings.number of players")}</Text>
            <TextInput keyboardType="number-pad" selectionColor="#42b4ff" style={{
                backgroundColor: "white",
                width: "10%",
                textAlign: "center",
                borderWidth: 1,
                borderColor: "#42b4ff",
                padding: 2
            }} />
        </View>
        <Text style={styles.sectionTitle}>{t("settings.cards")}</Text>

        <View style={{ flex: 1 }} />
        <WwButton text={t("settings.save changes")} variant="blue" />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingBottom: 16
    },
    text: {
        color: "white",
        textTransform: "uppercase",
        fontSize: 16,
        marginBottom: 8
    },
    sectionTitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        width: "100%",
        textTransform: "uppercase",
        marginBottom: 8
    }
})