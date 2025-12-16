import React, { useState } from "react";
import { Platform } from "react-native";

import {
  Button,
  DropdownSelect,
  Layout,
  Label,
  DatePicker,
} from "../../components/ui";

export default function HomeScreen() {
  const [pais, setPais] = useState("");
  const [date, setDate] = useState(new Date());

  const paises = [
    { label: "Argentina", value: "ar" },
    { label: "México", value: "mx" },
    { label: "España", value: "es" },
    { label: "Colombia", value: "co" },
    { label: "Chile", value: "cl" },
  ];

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      console.log(selectedDate);
    }
  };

  return (
    <Layout fullHeight>
      <DropdownSelect
        data={paises}
        value={pais}
        onSelect={setPais}
        placeholder="Elige tu país"
      />

      <Label>{pais}</Label>

      <DatePicker value={date} mode="date" onChange={onChange} />
    </Layout>
  );
}
