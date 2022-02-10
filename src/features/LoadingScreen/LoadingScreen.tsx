import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { useAppTranslation } from "..";

export interface LoadingScreenProps {
    message?: string;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({
    message
}) => {

    const { t } = useAppTranslation();

    return <View style={styles.container}>
        <Progress.Circle size={80} indeterminate={true} borderWidth={4} color="#42b4ff" />
        <Text style={styles.loadingText}>
            {t("general purpose.loading")}{message ? " " + message : ""}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        fontSize: 24,
        color: "#42b4ff",
        fontWeight: "bold",
        marginTop: 24,
        textTransform: "uppercase"
    }
})