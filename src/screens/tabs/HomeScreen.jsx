import React, { useState, useRef, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import {
  Layout,
  Label,
  Button,
  LoadingTemplate,
  ThemeBottomSheetModal,
} from "../../components/ui";
import { FlatListItem } from "../../components";

import { spacing } from "../../resources/spacing";
import Form from "../partials/Form";

import { TaskService } from "../../network/services";
import { useToast } from "../../hooks";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const bttSheet = useRef();
  const bttSheetActions = useRef();
  const toast = useToast();

  const handleBttSheetActionOpen = (item) => {
    setItemSelected(item);
    bttSheetActions?.current.present();
  };

  const handleBttSheet = () => {
    bttSheet?.current.present();
  };

  const handleEdit = (item) => {
    setEditingItem(item);

    bttSheetActions.current?.dismiss();

    setTimeout(() => {
      bttSheet.current?.present();
    }, 300);
  };

  const handleDelete = (item) => {
    Alert.alert("Eliminar tarea", "¿Estás seguro de eliminar este registro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await TaskService.delete(item.id);
            toast.success("Eliminado", "Registro eliminado correctamente");
            bttSheetActions.current?.dismiss();
          } catch (error) {
            toast.error("Error", error.message ?? "No se pudo eliminar");
          }
        },
      },
    ]);
  };

  const handleDetail = (item) => {
    bttSheetActions.current?.dismiss();

    setTimeout(() => {
      navigation.navigate("detail", { item });
    }, 250);
  };

  const renderHeader = () => {
    return (
      <Layout marginVertical="md">
        <Button icon="Plus" title="Nuevo" onPress={handleBttSheet} />
      </Layout>
    );
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = TaskService.subscribeAll(
      (task) => {
        setTasks(task);
        setLoading(false);
        console.log(task);
      },
      (err) => {
        toast.error("Error", err.message ?? "No se pudo recuperar los datos");
        setLoading(false);
      }
    );

    return () => unsubscribe?.();
  }, []);

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <FlatListItem
            item={item}
            onSelected={() => handleBttSheetActionOpen(item)}
          />
        )}
        contentContainerStyle={{
          paddingBottom: spacing.md,
          paddingHorizontal: spacing.md,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<>{loading ? <LoadingTemplate /> : undefined}</>}
      />

      <ThemeBottomSheetModal modalRef={bttSheetActions}>
        <BottomSheetView>
          <Layout direction="row" gap="sm" padding="md">
            <Button
              icon="Folder"
              title="Detalle"
              variant="outline"
              iconOnly
              onPress={() => handleDetail(itemSelected)}
            />
            <Button
              icon="NotebookPen"
              title="Editar"
              variant="outline"
              iconOnly
              onPress={() => handleEdit(itemSelected)}
            />
            <Button
              icon="Trash"
              title="Eliminar"
              variant="outline"
              iconOnly
              onPress={() => handleDelete(itemSelected)}
            />
          </Layout>
        </BottomSheetView>
      </ThemeBottomSheetModal>

      <Form
        modalRef={bttSheet}
        editingItem={editingItem}
        onFinish={() => setEditingItem(null)}
      />
    </>
  );
}
