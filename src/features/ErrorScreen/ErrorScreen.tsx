import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAppTranslation } from "..";

export interface ErrorScreenProps {
    message: string;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({
    message
}) => {

    const { t } = useAppTranslation();

    return <View style={styles.container}>
        <Icon name="wolf-pack-battalion" color="#db324d" size={160} />
        <Text style={styles.errorText}>{t("error.oops!")}</Text>
        <Text style={styles.errorMessage}>{message}</Text>
        <Text style={styles.errorMessage}>{t("error.are you connected to the internet?")}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    errorText: {
        color: "#db324d",
        fontSize: 48,
        textTransform: "uppercase",
        marginVertical: 24
    },
    errorMessage: {
        color: "white",
        textAlign: "justify",
        padding: 16
    }
})
