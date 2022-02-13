import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { DraxView, DraxViewProps } from "react-native-drax";

export type DraggableProps = DraxViewProps & {

}

export const Draggable: FC<DraggableProps> = ({
    ...draxViewProps
}) => {
    return (
        <DraxView
            style={StyleSheet.flatten([styles.container])}
            {...draxViewProps}
        >
            <Text style={styles.draggableText}>Hello</Text>
        </DraxView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#600C17',
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