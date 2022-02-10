import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Settings: FC = () => {
    return <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white"
    }
})