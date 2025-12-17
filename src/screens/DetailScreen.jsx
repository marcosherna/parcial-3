import { View } from "react-native";

import { Layout, Label, Card } from "../components/ui";
import { spacing } from "../resources/spacing";
import { formatDateTime } from "../helpers/DateFormat";

export default function DetailScreen({ route }) {
  const { item } = route.params;
  return (
    <View style={{ padding: spacing.md }}>
      <Card pressable={false}>
        <Layout gap="sm">
          <Label weight="bold">{item?.name}</Label>

          <Label color="muted">
            {formatDateTime(
              item?.date?.toDate ? item.date.toDate() : item.date
            )}
          </Label>

          <Label>{item.description}</Label>

          <Label>Estado: {item?.active ? "Activo" : "Inactivo"}</Label>
        </Layout>
      </Card>
    </View>
  );
}
