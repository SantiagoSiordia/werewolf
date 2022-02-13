import { WwButton, WwInput } from "@components";
import { ErrorScreen, LoadingScreen, useAppTranslation } from "@features";
import { useGame } from "@services";
import { useFormik } from "formik";
import React, { FC, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Draggable } from "./Draggable";

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

    const gameForm = useFormik({
        initialValues,
        onSubmit: (values, helpers) => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

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

        <Text style={styles.sectionTitle}>{t("settings.selected cards")}</Text>

        <Text style={styles.sectionTitle}>{t("settings.role assignation")}</Text>
        <Text style={styles.instructions}>{t("settings.Drag the roles into the blanks")}</Text>

        <FlatList
            data={playerInputsArray}
            initialNumToRender={4}
            renderItem={({ item }) => {
                return <View style={{ paddingRight: 8 }}>
                    <Draggable 
                        payload={"wolf" + item}
                        onDragStart={() => console.log("wolf")}
                        text={"wolf " + item}
                        variant="blue"
                    />
                </View>
            }}
            keyExtractor={(_, i) => `draggable_${i}`}
            contentContainerStyle={{ flexDirection: "row" }}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces
        />
    
        {playerInputsArray.map((_, i) => {
            return <WwInput
                key={`player_input_${i}`}
                name={`${t("general purpose.player")} ${i + 1}`}
                // @ts-expect-error
                value={gameForm.values[`players[${i}].name`]}
                onChangeText={gameForm.handleChange(`players[${i}].name`)}
                onBlur={gameForm.handleBlur(`players[${i}].name`)}
                // @ts-expect-error
                error={gameForm.touched[`players[${i}].name`] && !!gameForm.errors[`players[${i}].name`]}
                // @ts-expect-error
                errorMessage={gameForm.errors[`players[${i}].name`]}
                icon={<Icon name="person" color="#42b4ff" size={16} />}
            />
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
    }
})