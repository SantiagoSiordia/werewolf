import { FormikProps } from "formik";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { WwInput } from "~/src/components";
import { clearAssignableRoles, setNumberOfAssignableRoles } from "../../redux/assignableRoles";
import { useAppTranslation } from "../../translations";

export interface NumberOfPlayersInputProps {
    gameForm: FormikProps<Game>;
}

export const NumberOfPlayersInput: FC<NumberOfPlayersInputProps> = ({
    gameForm
}) => {

    const { t } = useAppTranslation();

    const dispatch = useDispatch();

    return <View style={styles.numberOfPlayersInput}>
        <Text style={styles.numberOfPlayersText}>{t("settings.number of players")}</Text>
        <WwInput
            keyboardType="number-pad"
            name={t("general purpose.number")}
            value={gameForm.values.numberOfPlayers + ""}
            onChangeText={ (value) => {
                gameForm.handleChange('numberOfPlayers')(value)
                dispatch(setNumberOfAssignableRoles(+value))
                dispatch(clearAssignableRoles())
            }}
            onBlur={gameForm.handleBlur('numberOfPlayers')}
            error={gameForm.touched.numberOfPlayers && !!gameForm.errors.numberOfPlayers}
            errorMessage={gameForm.errors.numberOfPlayers}
            width={100}
            disableLabel
            icon={<Icon name="format-list-numbered" color="#42b4ff" size={16} />}
        />
    </View>
}

const styles = StyleSheet.create({
    numberOfPlayersInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 4,
        alignItems: "center"
    },
    numberOfPlayersText: {
        color: "white",
        textTransform: "uppercase",
        fontSize: 16,
    },
})