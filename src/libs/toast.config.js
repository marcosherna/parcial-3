import { BaseToast, ErrorToast } from "react-native-toast-message";

export const createToastConfig = (theme) => ({
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.accent,
        backgroundColor: theme.surface,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: theme.text,
      }}
      text2Style={{
        fontSize: 14,
        color: theme.secondaryText,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#EF4444",
        backgroundColor: theme.surface,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: theme.text,
      }}
      text2Style={{
        fontSize: 14,
        color: theme.secondaryText,
      }}
    />
  ),
});
