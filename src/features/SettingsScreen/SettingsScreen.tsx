import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export const SettingsScreen: FC = () => {
    return <View style={{ backgroundColor: "black", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.text}>SettingsScreen</Text>
    </View>
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
})