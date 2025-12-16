import React, { useState } from "react";

import { Layout, Button } from "../../components/ui";

export default function HomeScreen({ navigation }) {
  return (
    <Layout fullHeight alignHorizontal="center" alignVertical="center">
      <Button
        variant="outline"
        title="go to detail"
        onPress={() => navigation.navigate("detail")}
      />
    </Layout>
  );
}
