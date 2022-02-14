import { WwButton } from "@components";
import { useAppTranslation } from "@features";
import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type LandingScreenProps = {
    setIsLanding: Dispatch<SetStateAction<boolean>>
}

const newLanguage: Record<string, "en-US" | "es-MX"> = {
    "en-US": "es-MX",
    "es-MX": "en-US"
}

export const LandingScreen: FC<LandingScreenProps> = ({ setIsLanding }) => {

    const { t, i18n } = useAppTranslation()

    const handleOnChangeLanguage = () => i18n.changeLanguage(newLanguage[i18n.language])

    return <SafeAreaView style={styles.safeAreaBackgrounColor}>
        <View style={styles.container}>
        <Text style={styles.welcome}>{t("landing.welcome to")}</Text>
        <Text style={styles.werewolf}>{t("app.title")}</Text>
        <WwButton text={t("general purpose.continue")} onPress={() => setIsLanding(false)} icon />
        <View style={styles.languageButtonContainer}>
            <WwButton
                text={t("general purpose.change language")}
                variant="blue"
                onPress={handleOnChangeLanguage}
            />
        </View>
    </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    welcome: {
        fontSize: 16,
        color: "white",
        textTransform: "uppercase"
    },
    werewolf: {
        fontSize: 48,
        color: "white",
        textTransform: "uppercase"
    },
    safeAreaBackgrounColor: {
        backgroundColor: "black"
    },
    languageButtonContainer: {
        position: "absolute",
        bottom: 16
    }
})