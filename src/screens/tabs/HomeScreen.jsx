import React, { useState } from "react";
import { FlatList } from "react-native";

import {
  Layout,
  Label,
  Button,
  Loading,
  LoadingTemplate,
} from "../../components/ui";
import { spacing } from "../../resources/spacing";

const renderHeader = () => {
  return (
    <Layout>
      <Label>header</Label>
    </Layout>
  );
};

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  return (
    <FlatList
      data={[{ id: 1, title: "test" }]}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="none"
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => <Label>{item.title}</Label>}
      contentContainerStyle={{ paddingBottom: spacing.md }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<>{loading ? <LoadingTemplate /> : undefined}</>}
    />
  );
}
