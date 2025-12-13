import Toast from "react-native-toast-message";

export function useToast() {
  const showSuccess = (title, message) => {
    Toast.show({
      type: "success",
      text1: title,
      text2: message,
    });
  };

  const showError = (title, message) => {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
    });
  };

  const showInfo = (title, message) => {
    Toast.show({
      type: "info",
      text1: title,
      text2: message,
    });
  };

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
  };
}
