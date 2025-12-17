import LottieView from "lottie-react-native";
import { Button, Layout, Label } from "../components/ui";

export default function WellcomeScreen({ navigation }) {
  return (
    <Layout padding="md" gap="md" alignVertical="flex-end" fullWidth fullHeight>
      <Layout fullWidth alignHorizontal="center" marginBottom="xl">
        <LottieView
          source={require("../../assets/animations/wavey-birdie.json")}
          autoPlay
          loop
          style={{ height: 240, width: 240 }}
        />
        <Label size="3xl" weight="bold" paragraph>
          Bienvenido
        </Label>
      </Layout>

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
