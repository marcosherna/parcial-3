import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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

      <Layout
        padding="md"
        gap="md"
        alignVertical="flex-end"
        fullWidth
        fullHeight
      >
        <Layout marginBottom="xl" alignHorizontal="center" fullWidth>
          <Label size="3xl" weight="semibold">
            Login
          </Label>
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

        <Button title="Registrarse" onPress={() => handleLogin()} fullWidth />
      </Layout>
    </SafeAreaView>
  );
}
