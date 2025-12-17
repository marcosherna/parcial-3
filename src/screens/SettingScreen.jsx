import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FileText, Info, LogOut, Trash2, KeyRound } from "lucide-react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { spacing } from "../resources/spacing";
import { iconography } from "../resources/iconography";

import { Avatar, Card, Divider, Layout, Shape, Label } from "../components/ui";
import { ItemSetting } from "../components";

import { useTheme, useAuth } from "../hooks";

import { AboutComponent } from "./partials/AboutComponent";
import { AlertDeleteSessionComponent } from "./partials/AlertDeleteSessionComponent";
import { TermAndConditionsComponent } from "./partials/TermAndConditionsComponent";

export default function SettingScreen() {
  const bttSheet = useRef();
  const [option, setOption] = useState("about");

  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();

  const handleOpenBttSheet = (option) => {
    setOption(option);
    bttSheet.current?.present();
  };

  const renderContent = useMemo(() => {
    if (option === "about") return <AboutComponent />;
    if (option === "terms") return <TermAndConditionsComponent />;
    if (option === "alertDeleteSession")
      return (
        <AlertDeleteSessionComponent
          onCancel={() => bttSheet.current?.dismiss()}
          onConfirm={(password) => handleDeleteAccount(password)}
        />
      );
  }, [option]);

  const handleDeleteAccount = async (password) => {
    try {
      if (!user) return;

      await reauthenticateUser(user, password);
      await deleteUser(user);
      bttSheet.current?.dismiss();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo eliminar la cuenta");
    } finally {
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: insets.bottom + spacing.md,
      }}
    >
      <ScrollView style={{ flex: 1, padding: spacing.md }}>
        <Layout gap="sm">
          <Label color="gray" weight="semibold">
            Informacion Personal
          </Label>
          <Card pressable={false}>
            <Layout
              direction="row"
              gap="md"
              alignHorizontal="center"
              padding="md"
            >
              <Avatar
                name={user?.displayName ?? "User"}
                source={{ uri: user?.photoURL ?? "" }}
                size={iconography.xl}
                online
              />
              <Layout gap="xs">
                <Label size="lg" weight="semibold" numberOfLines={1}>
                  {user?.displayName}
                </Label>
                <Label numberOfLines={1}>{user?.email}</Label>
              </Layout>
            </Layout>
          </Card>
        </Layout>

        <Layout marginTop="lg" gap="sm">
          <Label color="gray" weight="semibold">
            Soporte
          </Label>

          <Card pressable={false}>
            <Layout padding="md">
              <ItemSetting onPress={() => handleOpenBttSheet("about")}>
                <Shape variant="ghost" shape="circle" size={iconography.sm}>
                  <Info color={theme.secondaryText} size={iconography.sm} />
                </Shape>

                <Label size="lg">About</Label>
              </ItemSetting>

              <Divider margin={spacing.md} />

              <ItemSetting onPress={() => handleOpenBttSheet("terms")}>
                <Shape variant="ghost" shape="circle" size={iconography.sm}>
                  <FileText color={theme.secondaryText} size={iconography.sm} />
                </Shape>

                <Label size="lg">Terminos y condiciones</Label>
              </ItemSetting>
            </Layout>
          </Card>
        </Layout>

        <Layout marginTop="lg" gap="sm">
          <Label color="gray" weight="semibold">
            Cuenta
          </Label>

          <Card pressable={false}>
            <Layout padding="md">
              <ItemSetting onPress={() => handleLogout()}>
                <Shape variant="ghost" shape="circle" size={iconography.sm}>
                  <LogOut color={theme.secondaryText} size={iconography.sm} />
                </Shape>

                <Label size="lg">Cerrar Sesion</Label>
              </ItemSetting>

              <Divider margin={spacing.md} />

              <ItemSetting
                onPress={() => handleOpenBttSheet("alertDeleteSession")}
              >
                <Shape variant="ghost" shape="circle" size={iconography.sm}>
                  <Trash2 color={theme.secondaryText} size={iconography.sm} />
                </Shape>

                <Label size="lg">Eliminar cuenta</Label>
              </ItemSetting>
            </Layout>
          </Card>
        </Layout>
      </ScrollView>

      <BottomSheetModal
        ref={bttSheet}
        index={0}
        snapPoints={["25%"]}
        backgroundStyle={{
          backgroundColor: isDark ? theme.surface : theme.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark ? theme.outline : theme.secondaryText,
          width: 40,
        }}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: "hidden",
        }}
      >
        <BottomSheetScrollView>{renderContent}</BottomSheetScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
