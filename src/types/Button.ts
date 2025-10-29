import type { ReactNode } from "react";
import type { ViewStyle, TextStyle, StyleProp } from "react-native";

export interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  color?: "blue" | "default";
  style?: StyleProp<TextStyle | ViewStyle>;
}
