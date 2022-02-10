import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WwButton } from "~/src/components";
import { useAppTranslation } from "..";

export const SettingsScreen: FC = () => {
    const { t, i18n } = useAppTranslation();

    const newLanguage: Record<string, "en-US" | "es-MX"> = {
        "en-US": "es-MX",
        "es-MX": "en-US"
    }

    const handleToggleLanguage = () => i18n.changeLanguage(newLanguage[i18n.language]);
    
    return <View style={{ backgroundColor: "black", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.text}>SettingsScreen</Text>
        <WwButton text={t("general purpose.change language")} onPress={handleToggleLanguage} variant="blue" />
    </View>
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
})