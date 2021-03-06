import React, { FC } from "react";
import { Platform, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type WwInputProps = TextInputProps & {
    name: string;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
    icon?: React.ReactElement;
    width?: number | string;
    disableLabel?: boolean;
};

export const WwInput: FC<WwInputProps> = ({
    icon,
    name,
    placeholder = null,
    error = false,
    errorMessage,
    width,
    disableLabel,
    ...props
  }) => {
    return (
      <View style={{ width }}>
        {!disableLabel && <Text
          style={StyleSheet.flatten([
            formStyles.label,
            error ? formStyles.errorTextColor : {},
          ])}>
          {name}
        </Text>}
        <View
          style={StyleSheet.flatten([
            formStyles.inputContainer,
            error ? formStyles.inputContainerError : {},
            Platform.OS === "ios" ? formStyles.ios : {}
          ])}>
          {icon && <View style={formStyles.iconContainer}>
            {icon}
          </View>}
          <TextInput
            style={StyleSheet.flatten([
              formStyles.input,
              error ? formStyles.errorTextColor : {},
              icon ? { } : {}
            ])}
            placeholder={placeholder ?? name}
            placeholderTextColor="white"
            {...props}
          />
        </View>
        {error && (
          <Text style={formStyles.errorMessage}>Error: {errorMessage}</Text>
        )}
      </View>
    );
  };

  const formStyles = StyleSheet.create({
    label: {
      color: 'white',
      fontSize: 12,
      marginLeft: 8,
    },
    inputContainer: {
      backgroundColor: '#292d3e',
      borderRadius: 8,
      flexDirection: 'row',
      borderColor: "#42b4ff",
      borderWidth: 1
    },
    iconContainer: {
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      width: '60%',
      textAlign: "center",
      color: "white",
    },
    errorMessage: {
      color: '#c42348',
      fontSize: 12,
      marginLeft: 8,
    },
    inputContainerError: {
      borderWidth: 2,
      borderColor: '#c42348',
    },
    errorTextColor: {
      color: '#c42348',
    },
    ios: {
      paddingVertical: 16
    }
  });