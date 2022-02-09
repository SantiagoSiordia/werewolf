import { ParamListBase, RouteProp } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTranslation } from "../translations";

export type HeaderProps = {
    route: RouteProp<ParamListBase, string>;
}

export const Header: FC<HeaderProps> = ({ route }) => {

    const { t } = useAppTranslation();

    console.log(t(`screens.${route.name}`))

    return <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
            {t("app.title")}
        </Text>
        <Text style={styles.screenName}>
            {t(`screens.${route.name}`)}
        </Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignSelf: "center",
        padding: 16,
        backgroundColor: "black"
    },
    title: {
        fontSize: 48,
        width: "100%",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 4,
        color: "white"
    },
    screenName: {
        fontSize: 14,
        width: "100%",
        textAlign: "center",
        textTransform: "uppercase",
        color: "white"
    }
})