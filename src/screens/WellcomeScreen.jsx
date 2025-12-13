import { Button, Layout } from "../components/ui";

import { useToast } from "../hooks/useToast";

export default function WellcomeScreen({ navigation }) {
  const toask = useToast();

  return (
    <Layout padding="md" gap="md" alignVertical="flex-end" fullWidth fullHeight>
      <Button
        title="Iniciar sesion"
        fullWidth
        onPress={() => toask.success("Exito", "se aplico el toast")}
      />
      <Button
        title="Registrarse"
        variant="outline"
        fullWidth
        onPress={() => navigation.navigate("register")}
      />
    </Layout>
  );
}
