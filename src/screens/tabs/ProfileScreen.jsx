import { View } from "react-native";
import { Heart, GalleryVertical, CircleCheck } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Layout, Label, Button, Avatar } from "../../components/ui";

const ProfileHeader = ({ onSettion }) => {
  return (
    <> 
      <Layout
        direction="row"
        paddingVertical="xs"
        paddingHorizontal="md"
        alignVertical="flex-end"
      >
        <Button
          variant="outline"
          icon="Settings"
          iconOnly
          onPress={onSettion}
        />
      </Layout>

      <Layout
        direction="row"
        gap="md"
        paddingHorizontal="md"
        marginBottom="md"
        style={{ flex: 1 }}
      >
        <Avatar shape="square" size="large" name="Marcos Ramos" />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View style={{ flex: 1 }} />
          <Layout direction="row" gap="md" alignHorizontal="center">
            <Label size="xl" weight="bold" numberOfLines={1}>
              Marcos Ramos
            </Label>
            <CircleCheck />
          </Layout>

          <Label color="gray" paragraph numberOfLines={2}>
            marcosxdf@gmail.com
          </Label>
        </View>
      </Layout>
    </>
  );
};

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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileHeader />
      <View style={{ flex: 1 }}>
        <Label>contenido</Label>
      </View>
    </SafeAreaView>
  );
}
