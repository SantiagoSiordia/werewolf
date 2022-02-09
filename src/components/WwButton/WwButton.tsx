import React, { FC } from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

export type WwButtonProps = PressableProps & {
    text: string
}

export const WwButton: FC<WwButtonProps> = ({ text, ...pressableProps }) => {
    return <Pressable style={styles.container} {...pressableProps}>
        <View style={{ width: 16 }} />
        <Text style={styles.text}>{text}</Text>
        <Icon name="arrowright" color="white" size={16} />
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    text: {
        color: "white",
        fontSize: 16,
        textTransform: "uppercase",
    }
})