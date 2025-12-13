import { Button, Layout } from "../components/ui";

export default function WellcomeScreen({ navigation }) { 

  return (
    <Layout padding="md" gap="md" alignVertical="flex-end" fullWidth fullHeight>
      <Button
        title="Iniciar sesion"
        fullWidth
        onPress={() => navigation.navigate("login")}
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
