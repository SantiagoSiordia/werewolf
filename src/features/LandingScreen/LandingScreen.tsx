import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WwButton } from "../../components/WwButton";

export type LandingScreenProps = {
    setIsLanding: Dispatch<SetStateAction<boolean>>
}

export const LandingScreen: FC<LandingScreenProps> = () => {
    return <View style={styles.container}>
        <Text style={styles.welcome}>welcome to</Text>
        <Text style={styles.werewolf}>werewolf</Text>
        <WwButton text="Continue" onPress={() => console.log("Hello")} />
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