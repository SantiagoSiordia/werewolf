import { WwButton, WwInput } from "@components";
import { ErrorScreen, LoadingScreen, useAppTranslation } from "@features";
import { RoleCloudFirestore, useGame } from "@services";
import { useFormik } from "formik";
import React, { FC, useMemo, useState } from "react";
import { FlatListProps, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FlatGrid } from "react-native-super-grid";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Draggable } from "./Draggable";
import { PlayerInput } from "./PlayerInput";
import { SelectedRolesContainer } from "./SelectedRoleQuantity";

export interface SettingsProps {
    gameKey: string;
}

const initialValues: Game = {
    moderator: "",
    numberOfPlayers: "",
    balance: 0,
    players: [],
}

export const Settings: FC<SettingsProps> = ({
    gameKey
}) => {

    const { t } = useAppTranslation();

    const { data: game, isLoading: isGameLoading, isError: isGameError } = useGame(gameKey);

    const [ selectedRoles, setSelectedRoles ] = useState<Array<string>>([]);

    const gameForm = useFormik<Game>({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values, helpers) => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    const renderDraggables: FlatListProps<number>["renderItem"] = ({ item }) => {
        return <View style={{ paddingRight: 8 }}>
            <Draggable 
                payload={{
                    role: "wolf",
                    color: "#db324d"
                }}
                text={"wolf " + item}
                variant="blue"
            />
        </View>
    }

    const data: Array<RoleCloudFirestore> = [
        { name: "seer", image: "https://firebasestorage.googleapis.com/v0/b/santi-werewolf.appspot.com/o/seer.jpeg?alt=media&token=481617a3-cccf-4281-987d-aca90a3dbe0a", maxPerGame: 1, minPerGame: 1, points: 7, ref: 'seer' },
        { name: "wolf", image: "https://firebasestorage.googleapis.com/v0/b/santi-werewolf.appspot.com/o/wolf.jpeg?alt=media&token=ba01de11-ebe8-4cee-a552-dc24d2938266", minPerGame: 1, points: -3, ref: 'wolf' },
        { name: "villager", image: "https://firebasestorage.googleapis.com/v0/b/santi-werewolf.appspot.com/o/villager.jpeg?alt=media&token=386394a0-4e59-4fe4-8b02-1aa23fe489c4", minPerGame: 1, points: 1, ref: 'villager' },
        { name: "bodyguard", image: "https://firebasestorage.googleapis.com/v0/b/santi-werewolf.appspot.com/o/bodyguard.jpeg?alt=media&token=ec4d4a54-cb16-4390-91b6-990b1ec0465a", maxPerGame: 1, minPerGame: 1, points: 2, ref: 'bodyguard' },
        { name: "hunter", image: "https://firebasestorage.googleapis.com/v0/b/santi-werewolf.appspot.com/o/hunter.jpeg?alt=media&token=058b1776-17be-40a3-89ff-8d09f1d16284", maxPerGame: 1, minPerGame: 1, points: 3, ref: 'hunter' },
    ]

    const playerInputsArray = useMemo(() => Array.from({ length: +gameForm.values.numberOfPlayers}, (_, i) => i), [gameForm.values.numberOfPlayers])

    if(isGameLoading) return <LoadingScreen message={t("general purpose.game")} />

    if(isGameError) return <ErrorScreen message={t("error.keys.game")} />

    if(game == undefined) return null;

    return <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{t("settings.players")}</Text>
        <View style={styles.numberOfPlayersInput}>
            <Text style={styles.numberOfPlayersText}>{t("settings.number of players")}</Text>
            <WwInput
                keyboardType="number-pad"
                name={t("general purpose.number")}
                value={gameForm.values.numberOfPlayers + ""}
                onChangeText={gameForm.handleChange('numberOfPlayers')}
                onBlur={gameForm.handleBlur('numberOfPlayers')}
                error={gameForm.touched.numberOfPlayers && !!gameForm.errors.numberOfPlayers}
                errorMessage={gameForm.errors.numberOfPlayers}
                width={100}
                disableLabel
                icon={<Icon name="format-list-numbered" color="#42b4ff" size={16} />}
            />
        </View>

        <Text style={styles.sectionTitle}>{t("settings.cards")}</Text>
        
        <FlatGrid
            itemDimension={90}
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => {
                return <Pressable onPress={() => {
                    if (selectedRoles.includes(item.name)) {
                        setSelectedRoles(prev => prev.filter(role => role !== item.name))
                    } else {
                        setSelectedRoles(prev => Array.from(new Set([...prev, item.name])))
                    }
                }} >
                    <Image
                        source={{ uri: item.image }}
                        style={
                            StyleSheet.flatten([styles.characterImage, {
                                opacity: selectedRoles.includes(item.name) ? 1 : 0.5,
                            }])
                        }
                    />
                    <Text style={{ color: "white", textTransform: 'uppercase' }}>{item.name}</Text>
                </Pressable>
            }}
        />




        <Text style={styles.sectionTitle}>{t("settings.selected cards")}</Text>

        {selectedRoles.map((roleRef, index) => {
            return <SelectedRolesContainer key={roleRef + index} roleRef={roleRef} />
        })}

        <Text style={styles.sectionTitle}>{t("settings.role assignation")}</Text>
        <Text style={styles.instructions}>{t("settings.Drag the roles into the blanks")}</Text>

        <FlatList
            data={playerInputsArray}
            initialNumToRender={4}
            renderItem={renderDraggables}
            keyExtractor={(_, i) => `draggable_${i}`}
            contentContainerStyle={{ flexDirection: "row" }}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces
        />
    
        {playerInputsArray.map((_, i) => {
            return <PlayerInput key={`player_input_${i}`} gameForm={gameForm} index={i} />
        })}
        
        <View style={{ flex: 1 }} />
        <View style={{ marginVertical: 16 }}>
            <WwButton text={t("settings.save changes")} variant="blue" onPress={() => gameForm.handleSubmit()} />
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingBottom: 16
    },
    text: {
        color: "white",
        textTransform: "uppercase",
        fontSize: 16,
        marginBottom: 8
    },
    sectionTitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        width: "100%",
        textTransform: "uppercase",
        marginBottom: 8
    },
    instructions: {
        color: "white"
    },
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
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    characterImage: {
        width: '100%',
        aspectRatio: 0.75
    },
})