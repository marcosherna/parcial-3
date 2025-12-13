import Toast from "react-native-toast-message";
import { createToastConfig } from "../libs/toast.config";
import { useTheme } from "../hooks";

export function ToastProvider({ children }) {
  const { theme } = useTheme();

  return (
    <>
      {children}
      <Toast config={createToastConfig(theme)} />
    </>
  );
}
