import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const screenWidth = Dimensions.get('screen').width

export declare interface TableRowProps {
    first: string;
    second: string;
    third: string;
    title?: boolean;
}

export const TableRow: FC<TableRowProps> = ({
    first,
    second,
    third,
    title = false,
}) => {

    return <View style={styles.rowContainer}>
        <Text style={StyleSheet.flatten([
            title ? styles.tableTitle : styles.rowText,
            {
                textAlign: 'left'
            }
        ])}>
            {first}
        </Text>
        <Text style={StyleSheet.flatten([
            title ? styles.tableTitle : styles.rowText,
            {
                textAlign: 'center'
            }
        ])}>
            {second}
        </Text>
        <Text style={StyleSheet.flatten([
            title ? styles.tableTitle : styles.rowText,
            {
                textAlign: 'center'
            }
        ])}>
            {third}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    tableTitle: {
        color: "white",
        textTransform: "uppercase",
        width: screenWidth / 3 - 32,
        fontWeight: "bold"
    },
    rowText: {
        color: "white",
        textTransform: "uppercase",
        width: screenWidth / 3 - 32,
        fontSize: 10
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})