import React, { FC } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { RoleCloudFirestore } from "~/src/services";
import { useAppSelector } from "../../redux";
import { addAssignableRole, removeAssignableRole } from "../../redux/assignableRoles";
import { useAppTranslation } from "../../translations";

export interface RoleCardProps { 
    role: RoleCloudFirestore;
 }

export const RoleCard: FC<RoleCardProps> = ({
    role,
}) => {

    const allRoles = useAppSelector(state => state.assignableRoles.allAssignableRole);
    const numberOfAssignableRole = useAppSelector(state => state.assignableRoles.numberOfAssignableRole);
    const thereAreRolesAvailable = numberOfAssignableRole > 0;

    const dispatch = useDispatch();

    const { t } = useAppTranslation();

    console.log(thereAreRolesAvailable, numberOfAssignableRole, allRoles)

    const handleOnPress = () => {
        if(thereAreRolesAvailable) dispatch(addAssignableRole(role.ref));
        else if(allRoles.includes(role.ref)) dispatch(removeAssignableRole(role.ref));
    }

    const isDisabled = thereAreRolesAvailable && !allRoles.includes(role.ref);
    
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
