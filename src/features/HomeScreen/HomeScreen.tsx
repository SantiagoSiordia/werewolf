import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { WwSection } from "~/src/components/WwSection";
import { useGame } from "~/src/services";
import { useAppTranslation } from "..";

export const HomeScreen: FC = () => {
    const { t } = useAppTranslation()

    const { data: game, isLoading, isError } = useGame("i3DrhFPErA8bUDU4gNKO");

    if(isLoading) return <View>
        <Text>is loading</Text>
    </View>

    if(isError) return <View>
        <Text>is error</Text>
    </View>

    console.log(game);

    return <ScrollView style={{ flex: 1, backgroundColor: "black"}} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
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
            <Text style={styles.wolvesText}>
                {t("general purpose.wolves")}
            </Text>
            <Text style={styles.wolvesText}>
                {t("general purpose.villagers")}
            </Text>
    </ScrollView>
}

const styles = StyleSheet.create({
    playerRoles: {
        color: "white",
        width: "100%",
        padding: 16,
        textTransform: "uppercase",
        fontSize: 24,
        fontWeight: "bold"
    },
    wolvesText: {
        color: "white",
        width: "100%",
        paddingHorizontal: 16,
        textTransform: "uppercase",
        fontSize: 18,
    }
})