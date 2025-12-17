import { Card, Layout, Label, Divider, Tag } from "./ui";
import { Calendar } from "lucide-react-native";

import { formatDateTime } from "../helpers/DateFormat";

export function FlatListItem({ item, onSelected }) {
  return (
    <Card onPress={onSelected}>
      <Layout gap="md" padding="md">
        <Layout gap="xs">
          <Label size="lg" weight="bold">
            {item?.name}
          </Label>
          <Label color="gray" numberOfLines={2} paragraph>
            {item?.description}
          </Label>
        </Layout>

        <Divider />

        <Layout
          direction="row"
          alignVertical="space-between"
          alignHorizontal="center"
          fullWidth
        >
          <Layout direction="row" gap="sm" alignHorizontal="center">
            <Calendar />
            <Label>{formatDateTime(item?.date)}</Label>
          </Layout>

          <Tag
            label={item?.active ? "Activo" : "Inactivo"}
            variant={item?.active ? "success" : "primary"}
          />
        </Layout>
      </Layout>
    </Card>
  );
}
