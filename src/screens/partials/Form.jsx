import React, { useState, useRef } from "react";
import { View } from "react-native";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import {
  Layout,
  Button,
  ThemeBottomSheetModal,
  Switch,
  DatePicker,
} from "../../components/ui";

import { BttInput } from "../../components";

import { spacing } from "../../resources/spacing";
import { useForm, useToast } from "../../hooks";

export default function Form({ modalRef }) {
  const toast = useToast();
  const { values, errors, handleChange, validateForm, resetForm } = useForm({
    initialValues: {
      name: "",
      description: "",
      date: new Date(),
      active: true,
    },
    validations: {
      name: (value) => {
        if (!value) return "El nombre es obligatorio";
        return "";
      },
      description: (value) => {
        if (!value) return "La descripción es obligatoria";
        return "";
      },
    },
  });

  const handleSave = () => {
    if (!validateForm()) return;

    console.log(values);

    toast.success("Guardado", "Registro creado correctamente");

    resetForm();
    modalRef.current?.dismiss();
  };

  const handleClose = () => {
    resetForm();
    modalRef.current?.dismiss();
  };

  return (
    <ThemeBottomSheetModal
      modalRef={modalRef}
      snapPoints={["25%"]}
      onClose={() => handleClose()}
    >
      <BottomSheetScrollView>
        <View style={{ padding: spacing.md, gap: spacing.md }}>
          <BttInput
            label="Nombre"
            value={values.name}
            error={errors.name}
            onChangeText={(v) => handleChange("name", v)}
          />
          <BttInput
            label="Descripción"
            multiline
            numberOfLines={3}
            value={values.description}
            error={errors.description}
            onChangeText={(v) => handleChange("description", v)}
          />

          <Layout gap="xs">
            <DatePicker
              value={values.date}
              onChange={(_, date) => {
                if (date) handleChange("date", date);
              }}
            />
          </Layout>

          <Layout
            direction="row"
            alignVertical="space-between"
            alignHorizontal="center"
          >
            <Switch
              value={values.active}
              onValueChange={(v) => handleChange("active", v)}
            />

            <Button title="Guardar" onPress={handleSave} />
          </Layout>
        </View>
      </BottomSheetScrollView>
    </ThemeBottomSheetModal>
  );
}
