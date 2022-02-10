import React, { FC } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

type buttonVariants = "black" | "blue" | "red"

const backgroundColors: Record<buttonVariants, string> = {
    black: "#000000",
    blue: "#42b4ff",
    red: "#db324d"
}

export type WwButtonProps = PressableProps & {
    text: string,
    icon?: boolean,
    variant?: buttonVariants,
}

export const WwButton: FC<WwButtonProps> = ({ text, icon = false, variant = "black", ...pressableProps }) => {
    return <Pressable style={StyleSheet.flatten([
        styles.container,
        {
            backgroundColor: backgroundColors[variant]
        }
    ])} {...pressableProps}>
        <Text style={styles.text}>{text}</Text>
        {icon && <Icon name="arrowright" color="white" size={16} />}
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        borderRadius: 8
    },
    text: {
        color: "white",
        fontSize: 16,
        textTransform: "uppercase",
        textAlign: "center",
        width: "100%"
    }
})