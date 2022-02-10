import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useQueryClient } from "react-query";
import { WwButton, WwSection } from "~/src/components";
import { useGame } from "~/src/services";
import { removeItemFromAsyncStorage } from "~/src/services/async-storage";
import { QUERIES } from "~/src/services/queries/QUERIES";
import { useAppTranslation } from "../..";
import { LoadingScreen } from "../../LoadingScreen";

export interface GameStateProps {
    gameKey: string;
}

export const GameState: FC<GameStateProps> = ({ gameKey }) => {

    const { t } = useAppTranslation();

    const { data: game, isLoading: isLoadingGame, isError: isGameError } = useGame(gameKey);

    const queryClient = useQueryClient();

    const handleDeleteGame = async () => {
        try {
            await removeItemFromAsyncStorage(QUERIES.GAME_KEY);
            queryClient.invalidateQueries(QUERIES.GAME_KEY);
        } catch (error) {
            throw error
        }
    }

    if(isLoadingGame) return <LoadingScreen message={t("general purpose.game")} />

    if(isGameError) return <View>
        <Text>is error</Text>
    </View>

    return <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Text style={{ color: "white", width: "100%", fontWeight: "bold", textTransform: "capitalize", marginBottom: 16 }}>
            {t("general purpose.moderator")}: {game?.moderator}
        </Text>
        <WwSection title={t("general purpose.game balance")} displayNumber={8}>
        </WwSection>
        <WwSection title={t("general purpose.total number of players")} displayNumber={8}>
        </WwSection>
        <WwSection title={t("general purpose.current number of players")} displayNumber={8}>
        </WwSection>
        <WwSection title={t("general purpose.phase")} displayNumber={8}>
        </WwSection>
        <WwSection title={t("general purpose.dead players")} displayNumber={8}>
        </WwSection>
        <Text style={styles.playerRoles}>
            {t("general purpose.player roles")}
        </Text>
        <Text style={StyleSheet.flatten([styles.teamText, {
            color: "#db324d"
        }])}>
            {t("general purpose.wolves")}
        </Text>
        <Text style={StyleSheet.flatten([styles.teamText, {
            color: "#42b4ff"
        }])}>
            {t("general purpose.villagers")}
        </Text>

        <WwButton
            text={t("general purpose.delete")}
            variant="red"
            onPress={handleDeleteGame}
        />
    </ScrollView>
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "black"
    },
    container: {
        justifyContent: "center", 
        alignItems: "center",
        paddingHorizontal: 16
    },
    playerRoles: {
        color: "white",
        width: "100%",
        marginVertical: 16,
        textTransform: "uppercase",
        fontSize: 24,
        fontWeight: "bold"
    },
    teamText: {
        color: "white",
        width: "100%",
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: "bold"
    }
})