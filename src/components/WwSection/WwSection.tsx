import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export const WwSection: FC = () => {
    return <View >
        <Text style={styles.text}>Hello</Text>
    </View>
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
})