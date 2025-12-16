import { View, Text } from "react-native";
import { Heart, GalleryVertical } from "lucide-react-native";

import { Tabs, Layout, Label } from "../../components/ui";

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
            key: "favorities",
            title: "Favoritos",
            icon: <Heart />,
            content: <FavoritiesTab />,
          },
        ]}
      />
    </View>
  );
}
