import { Layout, Label, ThemeBottomSheetTextInput } from "./ui";

import { useTheme } from "../hooks";

export function BttInput({
  label,
  error = "",
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  ...props
}) {
  const { theme } = useTheme();

  return (
    <Layout gap="xs" style={containerStyle}>
      {label ? <Label style={labelStyle}>{label}</Label> : null}

      <ThemeBottomSheetTextInput
        {...props}
        style={[
          {
            borderWidth: 1,
            borderRadius: 8,
            borderColor: error ? "#EF4444" : theme.outline,
          },
          inputStyle,
        ]}
      />
      {error ? (
        <Label
          size="sm"
          weight="medium"
          style={[{ color: "#EF4444" }, errorStyle]}
        >
          {error}
        </Label>
      ) : null}
    </Layout>
  );
}
