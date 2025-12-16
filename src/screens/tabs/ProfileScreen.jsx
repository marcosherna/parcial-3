import { View } from "react-native";
import { Heart, GalleryVertical, CircleCheck } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Tabs, Layout, Label, Button, Avatar } from "../../components/ui";

import { iconography } from "../../resources/iconography";
import { spacing } from "../../resources/spacing";

import { useTheme, useAuth } from "../../hooks";

function FavoritiesTab() {
  return (
    <Layout>
      <Label>this is favorities content</Label>
    </Layout>
  );
}

function GalleryTab() {
  return (
    <Layout>
      <Label>this is gallery content</Label>
    </Layout>
  );
}

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        direction="row"
        paddingVertical="xs"
        paddingHorizontal="md"
        alignVertical="space-between"
        alignHorizontal="center"
      >
        <Layout direction="row" gap="md">
          {/* TODO: agregar logo */}
          <Label size="xl" weight="bold" color={theme.primary}>
            Perfil
          </Label>
        </Layout>
        <Button icon="Settings" variant="outline" iconOnly />
      </Layout>

      <Layout
        flexDirection="row"
        padding="md"
        gap="md"
        style={{
          alignSelf: "flex-start",
          alignItems: "center",
        }}
      >
        <Avatar
          source={{ uri: user?.photoURL ?? "" }}
          name={user?.displayName ?? "Marcos Ramos"}
          shape="square"
          online
        />
        <View style={{ flex: 1, gap: spacing.xs }}>
          <View style={{ flex: 1 }} />
          <Layout direction="row" gap="md" alignHorizontal="center">
            <Label size="xl" weight="bold" numberOfLines={1}>
              {user?.displayName ?? "Marcos Ramos"}
            </Label>
            <CircleCheck color={theme.primary} size={iconography.sm} />
          </Layout>

          <Label color="gray" paragraph numberOfLines={2}>
            {user?.email ?? "example@gmail.com"}
          </Label>
        </View>
      </Layout>

      <View style={{ flex: 1 }}>
        <Tabs
          tabs={[
            {
              key: "gallery",
              title: "Galeria",
              icon: <GalleryVertical />,
              content: <GalleryTab />,
            },
            {
              key: "fovorities",
              title: "Favoritos",
              icon: <Heart />,
              content: <FavoritiesTab />,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
