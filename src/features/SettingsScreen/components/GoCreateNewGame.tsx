import { useAppTranslation } from "@features";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export const GoCreateNewGame: FC = () => {

    const { t } = useAppTranslation();

    return <View style={styles.container}>
        <Text style={styles.title}>
            {t("create new game.create new game")}
        </Text>
        <Text style={styles.text}>
            {t("create new game.keys.settings instructions")}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: "white",
        fontSize: 24,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    text: {
        color: "white",
        fontSize: 16,
        textAlign: "justify",
        marginVertical: 16,
    }
})