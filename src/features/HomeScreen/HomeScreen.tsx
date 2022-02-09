import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { WwSection } from "~/src/components/WwSection";

export const Home: FC = () => {
    return <View style={{ backgroundColor: "black", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <WwSection />
    </View>
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
})