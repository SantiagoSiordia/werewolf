import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WwSection } from "~/src/components/WwSection";
import { useAppTranslation } from "..";

export const HomeScreen: FC = () => {
    const { t } = useAppTranslation();

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