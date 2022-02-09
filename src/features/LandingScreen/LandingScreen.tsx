import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WwButton } from "../../components/WwButton";
import { useAppTranslation } from "../translations";

export type LandingScreenProps = {
    setIsLanding: Dispatch<SetStateAction<boolean>>
}

export const LandingScreen: FC<LandingScreenProps> = ({ setIsLanding }) => {

    const { t } = useAppTranslation()

    return <View style={styles.container}>
        <Text style={styles.welcome}>{t("landing.welcome to")}</Text>
        <Text style={styles.werewolf}>{t("app.title")}</Text>
        <WwButton text={t("general purpose.continue")} onPress={() => setIsLanding(false)} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"
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
    }
})