import React, { FC } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { RoleCloudFirestore } from "~/src/services";
import { useAppSelector } from "../../redux";
import { addAvailableRole, removeAvailableRole } from "../../redux/availableRoles";
import { useAppTranslation } from "../../translations";

export interface RoleCardProps { 
    role: RoleCloudFirestore;
 }

export const RoleCard: FC<RoleCardProps> = ({
    role,
}) => {

    const allRoles = useAppSelector(state => state.roles.allRoles);
    const numberOfAvailableRoles = useAppSelector(state => state.roles.numberOfAvailableRoles);
    const noRolesAvailable = numberOfAvailableRoles < 1;

    const dispatch = useDispatch();

    const { t } = useAppTranslation();

    const handleOnPress = () => {
        if(noRolesAvailable) {
            if(allRoles.includes(role.ref)) dispatch(removeAvailableRole(role.ref))
        } else dispatch(addAvailableRole(role.ref));
    }

    const isDisabled = noRolesAvailable && !allRoles.includes(role.ref);
    
    return (
        <Pressable onPress={handleOnPress} disabled={isDisabled}>
            <Image
                source={{ uri: role.image }}
                style={StyleSheet.flatten([styles.characterImage, {
                    opacity: allRoles.includes(role.ref) ? 1 : 0.5
                }])} />
            <Text style={styles.roleText}>{t("roles." + role.ref)}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    roleText: { color: "white", textTransform: 'uppercase', fontSize: 8, textAlign: 'center', fontWeight: 'bold' },
    characterImage: {
        width: '100%',
        aspectRatio: 0.75
    },
})
