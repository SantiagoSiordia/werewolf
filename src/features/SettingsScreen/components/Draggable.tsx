import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type DraggableVariants = "red" | "blue";

const variants: Record<DraggableVariants, string> = {
    blue: "#42b4ff",
    red: '#600C17'
}

export type DraggableProps = {
    text: string;
    variant?: DraggableVariants
}

export const Draggable: FC<DraggableProps> = ({
    text,
    variant = "blue"
}) => {
    return (
        <View
            style={StyleSheet.flatten([styles.container, {
                backgroundColor: variants[variant]
            }])}
        >
            <Text style={styles.draggableText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8
    },
    draggableText: {
        fontSize: 16,
        color: "white",
        textTransform: "uppercase",
        fontWeight: "bold"
    },
})