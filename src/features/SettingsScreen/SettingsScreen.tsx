import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SettingsLogic } from "./components";

export const SettingsScreen: FC = () => {
    // const { t, i18n } = useAppTranslation();

    // const newLanguage: Record<string, "en-US" | "es-MX"> = {
    //     "en-US": "es-MX",
    //     "es-MX": "en-US"
    // }

    // const handleToggleLanguage = () => i18n.changeLanguage(newLanguage[i18n.language]);
    
    return <View style={styles.container}>
        <SettingsLogic />
    </View>
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    },
    container: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        paddingBottom: 0
    }
})