import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQueryClient } from "react-query";
import { WwButton } from "~/src/components";
import { QUERIES, storeInAsyncStorage } from "~/src/services";
import { useAppTranslation } from "../..";

export const CreateNewGame: FC = () => {

    const { t } = useAppTranslation();

    const queryClient = useQueryClient();

    const handleStoreGameKey = async () => {
        try {
            await storeInAsyncStorage(QUERIES.GAME_KEY, "i3DrhFPErA8bUDU4gNKO");
            queryClient.invalidateQueries(QUERIES.GAME_KEY);
        } catch (error) {
            throw error
        }
    }

    return <View style={styles.container}>
        <Text style={styles.title}>
            {t("create new game.create new game")}
        </Text>
        <Text style={styles.body}>
            {t("create new game.keys.body")}
        </Text>
        <View style={{ flex: 1 }} />
        <WwButton
            text={t("general purpose.create new game")}
            variant="blue"
            onPress={handleStoreGameKey}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: 16
    },
    playerRoles: {
        color: "white",
        width: "100%",
        padding: 16,
        textTransform: "uppercase",
        fontSize: 24,
        fontWeight: "bold"
    },
    teamText: {
        color: "white",
        width: "100%",
        paddingHorizontal: 16,
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: "bold"
    },
    title: {
        fontWeight: "bold",
        width: "100%",
        color: "white",
        fontSize: 24,
        textTransform: "uppercase"
    },
    body: {
        color: "white",
        fontSize: 16,
        width: "100%",
        marginVertical: 16,
        textAlign: "justify"
    }
})