import React, { FC } from "react"
import { Pressable, PressableProps, StyleSheet, Text } from "react-native"

export type WwButtonProps = PressableProps & {
    text: string
}

export const WwButton: FC<WwButtonProps> = ({ text, ...pressableProps }) => {
    return <Pressable style={styles.container} {...pressableProps}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    text: {
        color: "white",
        fontSize: 12
    }
})