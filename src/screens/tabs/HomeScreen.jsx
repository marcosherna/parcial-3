import React, { useState, useRef } from "react";
import { FlatList, View } from "react-native";

import { Layout, Label, Button, LoadingTemplate } from "../../components/ui";

import { spacing } from "../../resources/spacing";
import Form from "../partials/Form";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const bttSheet = useRef();

  const handleBttSheet = () => {
    bttSheet?.current.present();
  };

  const renderHeader = () => {
    return (
      <Layout paddingHorizontal="md" marginVertical="md">
        <Button icon="Plus" title="Nuevo" onPress={handleBttSheet} />
      </Layout>
    );
  };

  return (
    <>
      <FlatList
        data={[]}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => <Label>{item.title}</Label>}
        contentContainerStyle={{ paddingBottom: spacing.md }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<>{loading ? <LoadingTemplate /> : undefined}</>}
      />

      <Form modalRef={bttSheet} />
    </>
  );
}
