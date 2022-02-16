import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { DraxView, DraxViewProps } from "react-native-drax";

type DraggableVariants = "red" | "blue";

const variants: Record<DraggableVariants, string> = {
    blue: "#42b4ff",
    red: '#600C17'
}

export type DraggableProps = DraxViewProps & {
    text: string;
    variant?: DraggableVariants
}

export const Draggable: FC<DraggableProps> = ({
    text,
    variant = "blue",
    ...draxViewProps
}) => {
    return (
        <DraxView
            style={StyleSheet.flatten([styles.container, {
                backgroundColor: variants[variant]
            }])}
            {...draxViewProps}
        >
            <Text style={styles.draggableText}>{text}</Text>
        </DraxView>
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