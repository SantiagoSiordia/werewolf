import { WwButton } from "@components";
import { ErrorScreen, LoadingScreen, useAppTranslation } from "@features";
import { setGame, useGame, useRoles } from "@services";
import { useFormik } from "formik";
import React, { FC, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FlatGrid } from "react-native-super-grid";
import { useAppSelector } from "../../redux";
import { NumberOfPlayersInput } from "./NumberOfPlayersInput";
import { PlayerInput } from "./PlayerInput";
import { RoleCard } from "./RoleCard";
import { SelectedRolesContainer } from "./SelectedRoleQuantity";

export interface SettingsProps {
    gameKey: string;
}

const initialValues: Game = {
    moderator: "",
    numberOfPlayers: "",
    balance: 0,
    players: [],
    allRoles: []
}

export const Settings: FC<SettingsProps> = ({
    gameKey
}) => {

    const { t } = useAppTranslation();

    const { data: game, isLoading: isGameLoading, isError: isGameError } = useGame(gameKey);
    const { data: allRoles } = useRoles();

    const gameForm = useFormik<Game>({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            setGame("i3DrhFPErA8bUDU4gNKO", values)
        },
    });

    
    if(isGameLoading) return <LoadingScreen message={t("general purpose.game")} />
    
    if(isGameError) return <ErrorScreen message={t("error.keys.game")} />
    
    if(game == undefined) return null;

    const playerInputsArray = useMemo(() => Array.from({ length: +gameForm.values.numberOfPlayers}, (_, i) => i), [gameForm.values.numberOfPlayers])
    
    const allAssignableRoles = useAppSelector(state => state.assignableRoles.allAssignableRoles);
    const numberOfAssignableRoles = useAppSelector(state => state.assignableRoles.numberOfAssignableRoles);
    const gameBalance = useAppSelector(state => state.assignableRoles.balance);
    const noRolesAvailable = numberOfAssignableRoles < 1;

    const areCardsVisible = gameForm.values.numberOfPlayers > 0;
    const isAssignationVisible = areCardsVisible && allAssignableRoles.length > 0;

    const handleSaveChanges = () => {
        gameForm.setValues((prevGame) => {
            const newGame = {
                ...prevGame,
                balance: gameBalance,
                allRoles: allAssignableRoles,
                moderator: "Santiago"
            }
            return newGame;
        })
        gameForm.handleSubmit();
    }

    return <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.gameBalance}>{t("general purpose.game balance")}: {gameBalance}</Text>

        <Text style={styles.sectionTitle}>{t("settings.players")}</Text>
        <NumberOfPlayersInput gameForm={gameForm} />

        {
            areCardsVisible && <>
                <Text style={styles.sectionTitle}>{t("settings.cards")}</Text>
                {noRolesAvailable && <Text style={styles.sectionInfo}>{t("settings.no roles available")}</Text>}
                
                {allRoles !== undefined && <FlatGrid
                    itemDimension={90}
                    scrollEnabled={false}
                    data={allRoles}
                    renderItem={({ item }) => {
                        return <RoleCard role={item} />
                    }}
                />}
            </>
        }

        {allAssignableRoles.length !== 0 && <>
            <Text style={styles.sectionTitle}>{t("settings.selected cards")}</Text>

            {allAssignableRoles.map((roleRef, index) => {
                return <SelectedRolesContainer key={roleRef + index} roleRef={roleRef} gameForm={gameForm} />
            })}
        </>}

        {
            isAssignationVisible && <>
                <Text style={styles.sectionTitle}>{t("settings.role assignation")}</Text>
                {playerInputsArray.map((_, i) => <PlayerInput key={`player_input_${i}`} gameForm={gameForm} index={i} />)}
            </>
        }
        
        <View style={{ flex: 1 }} />
        <View style={{ marginVertical: 16 }}>
            <WwButton text={t("settings.save changes")} variant="blue" onPress={handleSaveChanges} />
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
    sectionInfo: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: "white"
    },
    gameBalance: {
        textAlign: 'center',
        color: "white",
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})