import { WwButton, WwInput } from "@components";
import { ErrorScreen, LoadingScreen, useAppTranslation } from "@features";
import { useGame } from "@services";
import { useFormik } from "formik";
import React, { FC, useMemo } from "react";
import { FlatListProps, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FlatGrid } from 'react-native-super-grid';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Draggable } from "./Draggable";
import { PlayerInput } from "./PlayerInput";

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
            data={[
                { name: 'TURQUOISE', code: '#1abc9c' },
                { name: 'EMERALD', code: '#2ecc71' },
                { name: 'PETER RIVER', code: '#3498db' },
                { name: 'AMETHYST', code: '#9b59b6' },
                { name: 'WET ASPHALT', code: '#34495e' },
                { name: 'GREEN SEA', code: '#16a085' },
                { name: 'NEPHRITIS', code: '#27ae60' },
                { name: 'BELIZE HOLE', code: '#2980b9' },
                { name: 'WISTERIA', code: '#8e44ad' },
                { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
                { name: 'SUN FLOWER', code: '#f1c40f' },
                { name: 'CARROT', code: '#e67e22' },
                { name: 'ALIZARIN', code: '#e74c3c' },
                { name: 'CLOUDS', code: '#ecf0f1' },
                { name: 'CONCRETE', code: '#95a5a6' },
                { name: 'ORANGE', code: '#f39c12' },
                { name: 'PUMPKIN', code: '#d35400' },
                { name: 'POMEGRANATE', code: '#c0392b' },
                { name: 'SILVER', code: '#bdc3c7' },
                { name: 'ASBESTOS', code: '#7f8c8d' },
            ]}
            renderItem={({ item }) => (
            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.code}</Text>
            </View>
            )}
        />

        <Text style={styles.sectionTitle}>{t("settings.selected cards")}</Text>

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
})