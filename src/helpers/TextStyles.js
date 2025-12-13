import { PixelRatio } from "react-native";
import { fontSizes, fontWeights, lineHeights } from "../resources/typography";

export const getTextStyle = (
  size = "md",
  weight = "normal",
  color = "#000000",
  align = "left",
  paragraph = false
) => {
  const baseSize = fontSizes[size];

  return {
    fontSize: PixelRatio.roundToNearestPixel(baseSize),
    fontWeight: fontWeights[weight],
    color,
    textAlign: align,
    lineHeight: paragraph
      ? PixelRatio.roundToNearestPixel(lineHeights[size])
      : undefined,
  };
};
