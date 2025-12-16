import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

import { useTheme } from "../../hooks/useTheme";
import { spacing } from "../../resources/spacing";
import { fontSizes, fontWeights } from "../../resources/typography";
import { iconography } from "../../resources/iconography";

export const DropdownSelect = ({
  data = [],
  placeholder = "Selecciona una opción",
  value,
  onSelect,
  label,
  error = false,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const selectedOption = data.find((item) => item.value === value);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onSelect(item.value);
        setVisible(false);
      }}
    >
      <Text style={[styles.itemText, { color: theme.text }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginVertical: spacing.sm }}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}

      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            backgroundColor: theme.surface,
            borderColor: error ? theme.accent : theme.outline,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        onPress={() => !disabled && setVisible(true)}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text
          style={[
            styles.selectedText,
            {
              color: selectedOption ? theme.text : theme.secondaryText,
            },
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <ChevronDown
          size={iconography.md}
          color={disabled ? theme.secondaryText : theme.text}
          strokeWidth={iconography.stroke}
        />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.surface,
                borderColor: theme.outline,
              },
            ]}
          >
            <FlatList
              data={data}
              keyExtractor={(item) => item.value.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  selectedText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modalContent: {
    width: "100%",
    maxHeight: "70%",
    borderRadius: spacing.md,
    borderWidth: 1,
    paddingVertical: spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  item: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  itemText: {
    fontSize: fontSizes.md,
  },
});
