import { useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

import { useTheme } from "../../hooks";

export function ThemeBottomSheetTextInput({
  multiline,
  numberOfLines = 1,
  style,
  ...props
}) {
  const { theme } = useTheme();

  return (
    <BottomSheetTextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      placeholderTextColor={theme.secondaryText}
      textAlignVertical={multiline ? "top" : "center"}
      style={[
        styles.input,
        multiline && {
          minHeight: numberOfLines * 24 + 16,
        },
        {
          backgroundColor: theme.surface,
          color: theme.text,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function ThemeBottomSheetModal({
  modalRef,
  snapPoints,
  children,
  onClose,
  ...props
}) {
  const { isDark, theme } = useTheme();
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={isDark ? 0.6 : 0.4}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="collapse"
        onPress={onClose}
      />
    ),
    [isDark, onClose]
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: isDark ? theme.surface : theme.background,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDark ? theme.outline : theme.secondaryText,
        width: 40,
      }}
      style={{
        overflow: "hidden",
      }}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    width: "100%",
  },
});
