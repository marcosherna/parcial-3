import { Label, Layout, Button, Input } from "../components/ui";

export default function RegisterScreen({ navigation }) {
  return (
    <Layout fullHeight fullWidth alignVertical="flex-end" padding="md">
      <Layout fullWidth alignHorizontal="center" marginBottom="xl">
        <Label size="3xl">Register</Label>
      </Layout>

      <Layout gap="xs" fullWidth>
        <Input label="Name" />
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
