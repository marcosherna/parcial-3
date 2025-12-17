import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import LottieView from "lottie-react-native";

import { spacing } from "../resources/spacing";
import { Layout, LoadingModal, Label, Input, Button } from "../components/ui";

import { useForm, useAuth, useToast } from "../hooks";

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { sigIn } = useAuth();
  const toast = useToast();

  const { values, errors, handleChange, validateForm } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validations: {
      email: (value) => {
        if (!value) return "El email es obligatorio";
        if (!value.includes("@")) return "Email inválido";
        return "";
      },
      password: (value) => {
        if (!value) return "La contraseña es obligatoria";
        if (value.length < 6) return "Debe tener al menos 6 caracteres";
        return "";
      },
    },
  });

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await sigIn(values.email, values.password);
      setLoading(false);
      toast.success("Bienvenido", "Inicio de sesión exitoso");
      navigation.reset({
        index: 0,
        routes: [{ name: "main" }],
      });
    } catch (error) {
      setLoading(false);
      toast.error("Error", "Credenciales incorrectas");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModal visible={loading} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Layout gap="md" fullWidth>
          <Layout alignHorizontal="center" fullWidth>
            <LottieView
              source={require("../../assets/animations/time-tracker.json")}
              autoPlay
              loop
              style={{ height: 240, width: 240 }}
            />
          </Layout>

          <Layout gap="xs" fullWidth>
            <Input
              label="Email"
              placeholder="correo@ejemplo.com"
              value={values.email}
              error={errors.email}
              keyboardType="email-address"
              onChangeText={(v) => handleChange("email", v)}
            />

            <Input
              label="Password"
              placeholder="••••••••"
              value={values.password}
              error={errors.password}
              secureTextEntry
              showTogglePassword
              onChangeText={(v) => handleChange("password", v)}
            />
          </Layout>

          <Button title="Registrarse" onPress={handleLogin} fullWidth />
        </Layout>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: "center",
    gap: spacing.lg,
  },
});
