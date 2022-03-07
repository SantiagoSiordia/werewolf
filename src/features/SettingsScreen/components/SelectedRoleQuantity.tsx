import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useAppTranslation } from "../../translations";

export interface SelectedRolesContainerProps {
    role: string;
}

export const SelectedRolesContainer: FC<SelectedRolesContainerProps> = ({
    role
}) => {

    const [ count, setCount ] = useState<number>(1);
    const { t } = useAppTranslation();

    const handleOnMinus = () => {
        if (count > 1) setCount(prev => prev - 1)
    };

    const handleOnPlus = () => {
        setCount(prev => prev + 1)
    }

    const isAbleToMinus = count > 1;

    return <View style={styles.selectedRolesContainer}>
        <Text style={styles.roleSelectedText}>{t("roles." + role)}</Text>
        <View style={styles.filler} />
        <View style={styles.counterContainer}>
            <AntDesign name="minuscircle" size={24} color={isAbleToMinus ? "#db324d" : "gray"} onPress={handleOnMinus} />
            <Text style={styles.counterText}>{count}</Text>
            <AntDesign name="pluscircle" size={24} color="#42b4ff" onPress={handleOnPlus} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    roleSelectedText: {
        fontSize: 20,
        color: "white",
        textTransform: "uppercase",
    },
    selectedRolesContainer: {
        flexDirection: "row",
        paddingVertical: 16,
    },
    filler: { flex: 1 },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    counterText: { 
        color: "white",
        marginHorizontal: 8
     }
})