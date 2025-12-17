import { useState } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { spacing } from "../resources/spacing";
import { Label, Layout, Button, Input, LoadingModal } from "../components/ui";

import { useForm, useAuth, useToast } from "../hooks";

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const toast = useToast();

  const { values, errors, handleChange, validateForm } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validations: {
      name: (value) => {
        if (!value) return "El nombre es obligatorio";
        if (value.length < 3) return "Mínimo 3 caracteres";
        return "";
      },
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

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await register(values.name, values.email, values.password);
      setLoading(false);
      toast.success("Cuenta creada", "Registro exitoso");
    } catch (error) {
      setLoading(false);
      toast.error("Error", "No se pudo crear la cuenta");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Layout fullWidth alignVertical="flex-end">
          <LoadingModal visible={loading} />
          <Layout fullWidth alignHorizontal="center" marginBottom="xl">
            <LottieView
              source={require("../../assets/animations/time-tracker.json")}
              autoPlay
              loop
              style={{ height: 240, width: 240 }}
            />
          </Layout>

          <Layout gap="xs" fullWidth>
            <Input
              label="Name"
              placeholder="Tu nombre"
              value={values.name}
              error={errors.name}
              onChangeText={(v) => handleChange("name", v)}
            />

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

            <Button title="Registrarse" fullWidth onPress={handleRegister} />
          </Layout>
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
