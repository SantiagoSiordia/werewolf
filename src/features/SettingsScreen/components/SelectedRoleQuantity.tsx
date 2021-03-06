import { FormikProps } from "formik";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { RoleNamesRef } from "~/src/services";
import { useRole } from "~/src/services/queries/useRole";
import { useAppSelector } from "../../redux";
import { decreaseAssignableRoles, increaseAssignableRoles } from "../../redux/assignableRoles";
import { useAppTranslation } from "../../translations";

export interface SelectedRolesContainerProps {
    roleRef: RoleNamesRef;
    gameForm: FormikProps<Game>
}

export const SelectedRolesContainer: FC<SelectedRolesContainerProps> = ({
    roleRef,
    gameForm
}) => {

    const [ count, setCount ] = useState<number>(1);
    const { t } = useAppTranslation();
    const { data: singleRole, isLoading, isError } = useRole(roleRef);
    const dispatch = useDispatch();
    const numberOfAssignableRoles = useAppSelector(state => state.assignableRoles.numberOfAssignableRoles);
    const { data: role } = useRole(roleRef)

    if( isLoading || isError) return null;

    const isAbleToMinus = !!singleRole?.minPerGame ? count > singleRole?.minPerGame : true;
    const isAbleToPlus = (!!singleRole?.maxPerGame ? count < singleRole?.maxPerGame : true) && numberOfAssignableRoles > 0;
    
    const handleOnMinus = () => {
        if(isAbleToMinus) {
            setCount(prev => prev - 1);
            dispatch(increaseAssignableRoles({
                roleRef: roleRef,
                // @ts-expect-error is already loaded
                points: role.points
            }));
        }
    };

    const handleOnPlus = () => {
        if(isAbleToPlus) {
            setCount(prev => prev + 1);
            dispatch(decreaseAssignableRoles({
                roleRef: roleRef,
                // @ts-expect-error is already loaded
                points: role.points
            }));
        }
    }

    return <View style={styles.selectedRolesContainer}>
        <Text style={styles.roleSelectedText}>{t("roles." + roleRef)}</Text>
        <View style={styles.filler} />
        <View style={styles.counterContainer}>
            <AntDesign name="minuscircle" size={24} color={isAbleToMinus ? "#db324d" : "gray"} onPress={handleOnMinus} />
            <Text style={styles.counterText}>{count}</Text>
            <AntDesign name="pluscircle" size={24} color={isAbleToPlus ? "#42b4ff" : "gray"} onPress={handleOnPlus} />
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