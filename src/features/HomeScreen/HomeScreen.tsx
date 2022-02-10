import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WwSection } from "~/src/components/WwSection";
import { useGame } from "~/src/services";
import { useAppTranslation } from "..";

export const HomeScreen: FC = () => {
    const { t } = useAppTranslation()

    const { data: game, isLoading, isError } = useGame("i3DrhFPErA8bUDU4gNKO");

    if(isLoading) return <View>
        <Text>is loading</Text>
    </View>

    if(isError) return <View>
        <Text>is error</Text>
    </View>

    console.log(game)

    return <View style={{ backgroundColor: "black", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <WwSection title={t("general purpose.game balance")} displayNumber={8}>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
        </WwSection>
    </View>
}

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
})