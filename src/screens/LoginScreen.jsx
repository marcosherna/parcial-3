import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Layout, Label } from "../components/ui";

export default function LoginScreen({ navigation }) {
  return (
    <Layout fullHeight fullWidth alignVertical="flex-end" padding="md">
      <Layout fullWidth alignHorizontal="center" marginBottom="xl">
        <Label size="3xl">Login</Label>
      </Layout>

      <Layout gap="xs" fullWidth>
        <Input label="Email" />
        <Input label="Password" />
        <Button
          title="Iniciar Sesion"
          fullWidth
          onPress={() => navigation.navigate("main")}
        />
      </Layout>
    </Layout>
  );
}
