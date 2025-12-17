import { useState } from "react";
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

      navigation.reset({
        index: 0,
        routes: [{ name: "main" }],
      });
    } catch (error) {
      setLoading(false);
      toast.error("Error", "No se pudo crear la cuenta");
    }
  };

  return (
    <Layout fullHeight fullWidth alignVertical="flex-end" padding="md">
      <LoadingModal visible={loading} />
      <Layout fullWidth alignHorizontal="center" marginBottom="xl">
        <Label size="3xl">Register</Label>
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
  );
}
