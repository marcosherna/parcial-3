import React, { useState } from "react";
import { View, Text } from "react-native";

import { Button, DropdownSelect, Layout, Label } from "../../components/ui";

export default function HomeScreen() {
  const [pais, setPais] = useState("");

  const paises = [
    { label: "Argentina", value: "ar" },
    { label: "México", value: "mx" },
    { label: "España", value: "es" },
    { label: "Colombia", value: "co" },
    { label: "Chile", value: "cl" },
  ];

  return (
    <Layout fullHeight>
      <DropdownSelect
        data={paises}
        value={pais}
        onSelect={setPais}
        placeholder="Elige tu país"
      />

      <Label>{pais}</Label>
    </Layout>
  );
}
