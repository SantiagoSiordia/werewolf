import React, { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export interface WwSectionProps {
    title: string;
    displayNumber?: number;
}

export const WwSection: FC<WwSectionProps> = ({
    title,
    children,
    displayNumber
}) => {

    const [ isSectionOpen, setIsSectionOpen ] = useState<boolean>(false);

    const handleOnSectionPress = () => setIsSectionOpen(prev => !prev)

    return <View style={styles.container}>
        <Pressable style={styles.pressable} onPress={handleOnSectionPress}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.numberAndArrowContainer}>
                {displayNumber && <>
                    <Text style={styles.text}>{displayNumber}</Text>
                    <View style={{ width: 8 }} />
                </>}
                <Icon name="chevron-down" color="white" size={24} />
            </View>
        </Pressable>
        { isSectionOpen ? children : null }
        <View style={styles.divider} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16
    },
    pressable: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        color: "white",
        textTransform: "uppercase"
    },
    divider: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "white",
        marginTop: 8
    },
    numberAndArrowContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})