import { WwInput } from "@components";
import { useAppTranslation } from "@features";
import { FormikProps } from "formik";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export interface PlayerInputProps {
    gameForm: FormikProps<Game>;
    index: number;
}

export interface PlayerRole {
    role: string;
    color: string
}

export const PlayerInput: FC<PlayerInputProps> = ({
    gameForm,
    index
}) => {

    const { t } = useAppTranslation();

    const [ playerRole, setPlayerRole ] = useState<PlayerRole>({
        role: "",
        color: ""
    });

    const handleOnReceiveRole = (data: any) => {
        gameForm.setFieldValue(`players[${index}].role`, data.dragged.payload.role);
        setPlayerRole({ ...data.dragged.payload })
    }

    return <View style={styles.container}>
        <WwInput
            name={`${t("general purpose.player")} ${index + 1}`}
            // @ts-expect-error
            value={gameForm.values[`players[${index}].name`]}
            onChangeText={gameForm.handleChange(`players[${index}].name`)}
            onBlur={gameForm.handleBlur(`players[${index}].name`)}
            // @ts-expect-error
            error={gameForm.touched[`players[${index}].name`] && !!gameForm.errors[`players[${index}].name`]}
            // @ts-expect-error
            errorMessage={gameForm.errors[`players[${index}].name`]}
            icon={<Icon name="person" color="#42b4ff" size={16} />}
            width="50%"
        />
        <View style={styles.flex1} />
        <Text style={styles.isAText}>{t("settings.is a")}</Text>
        <View style={styles.flex1} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        paddingTop: 8
    },
    isAText: {
        color: "white",
        alignSelf: "center",
        paddingTop: 12
    },
    draggableReceiver: {
        marginTop: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "white",
        height: 30,
        width: "30%"
    },
    roleAssignedReceiver: {
        marginTop: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#42b4ff",
        height: 30,
        width: "30%",
        alignItems: "center",
        justifyContent: "center"
    },
    receivedRoleText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
        textTransform: "uppercase"
    },
    draggableReceiverText: {
        color: "white"
    },
    flex1: {
        flex: 1
    }
})