import { WwInput } from "@components";
import { useAppTranslation } from "@features";
import { FormikProps } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { RoleNamesRef } from "~/src/services";
import { useAppSelector } from "../../redux";
import { assignRole } from "../../redux/assignableRoles";

const screenWidth = Dimensions.get('screen').width
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

    const noSetRoles = useAppSelector(state => state.assignableRoles.availableRoles);
    const allAssignableRoles = useAppSelector(state => state.assignableRoles.allAssignableRoles);

    const dispatch = useDispatch();

    const arrayOfItems = allAssignableRoles.map(element => {
        const itemDisabled = noSetRoles[element] === undefined || noSetRoles[element] === 0;
        return { label: t("roles." + element).toUpperCase(), value: element, disabled: itemDisabled }
    });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<RoleNamesRef | ''>('');

    useEffect(() => {
        gameForm.setFieldValue(`players[${index}].role`, value);
        if(value !== '') dispatch(assignRole(value));
    }, [value]);

    return <>
        <View style={styles.container}>
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
        <View style={styles.dropDownContainer}>
            <DropDownPicker
                dropDownDirection="TOP"
                theme="DARK"
                open={open}
                value={value}
                items={arrayOfItems}
                setOpen={setOpen}
                setValue={(value) => {
                    // @ts-expect-error
                    value !== undefined && setValue(value);
                }}
                placeholder={t('settings.select a role')}
                style={styles.dropDown}
                modalContentContainerStyle={{ zIndex: 100, elevation: 100}}
            />
        </View>
    </>
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
    flex1: {
        flex: 1
    },
    dropDownContainer: {
        width: screenWidth - 32,
        zIndex: 10,
        marginTop: 8
    },
    dropDown: {
        borderColor: "#42b4ff",
    }
})