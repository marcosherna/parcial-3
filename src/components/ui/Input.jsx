import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

import { getTextStyle } from "../../helpers/TextStyles";
import { useTheme } from "../../hooks/useTheme";

export function Input({
  label = "",
  error = "",
  placeholder = "",
  value,
  onChangeText,
  multiline = false,
  keyboardType = "default",

  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,

  labelSize = "md",
  labelWeight = "semibold",
  inputSize = "md",
  inputWeight = "normal",
  errorSize = "sm",
  errorWeight = "medium",

  secureTextEntry,
  showTogglePassword = false,

  ...props
}) {
  const { theme } = useTheme();
  const [hidden, setHidden] = React.useState(!!secureTextEntry);

  const colors = {
    label: theme.text,
    inputBorder: theme.outline,
    inputBackground: theme.surface,
    inputText: theme.text,
    placeholder: theme.secondaryText,
    error: "#EF4444",
  };

  const labelTextStyle = getTextStyle(labelSize, labelWeight, colors.label);
  const inputTextStyle = getTextStyle(inputSize, inputWeight, colors.inputText);
  const errorTextStyle = getTextStyle(errorSize, errorWeight, colors.error);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* LABEL */}
      {label ? (
        <Text style={[{ marginBottom: 8 }, labelTextStyle, labelStyle]}>
          {label}
        </Text>
      ) : null}

      {/* INPUT WRAPPER */}
      <View style={{ position: "relative" }}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: error ? colors.error : colors.inputBorder,
              backgroundColor: colors.inputBackground,
            },
            multiline && styles.multilineInput,
            inputTextStyle,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          keyboardType={keyboardType}
          secureTextEntry={hidden}
          {...props}
        />

        {/* ICONO MOSTRAR / OCULTAR */}
        {showTogglePassword && (
          <TouchableOpacity
            onPress={() => setHidden(!hidden)}
            style={styles.eyeButton}
            activeOpacity={0.6}
          >
            {hidden ? (
              <EyeOff size={20} color={theme.secondaryText} />
            ) : (
              <Eye size={20} color={theme.secondaryText} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* ERROR */}
      {error ? <Text style={[errorTextStyle, errorStyle]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },

  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  eyeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
});
