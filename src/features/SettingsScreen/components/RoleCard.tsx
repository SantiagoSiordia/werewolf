import React, { FC } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { RoleCloudFirestore } from "~/src/services";
import { useAppTranslation } from "../../translations";

export interface RoleCardProps { 
    role: RoleCloudFirestore;
    setSelectedRoles: React.Dispatch<React.SetStateAction<string[]>>;
    selectedRoles: string[]
 }

export const RoleCard: FC<RoleCardProps> = ({
    role,
    setSelectedRoles,
    selectedRoles
}) => {

    const { t } = useAppTranslation(); 
    return (
        <Pressable onPress={() => {
            if (selectedRoles.includes(role.ref)) {
                setSelectedRoles(prev => prev.filter(prevRole => prevRole !== role.ref));
            } else {
                setSelectedRoles(prev => Array.from(new Set([...prev, role.ref])));
            }
        } }>
            <Image
                source={{ uri: role.image }}
                style={StyleSheet.flatten([styles.characterImage, {
                    opacity: selectedRoles.includes(role.ref) ? 1 : 0.5
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
