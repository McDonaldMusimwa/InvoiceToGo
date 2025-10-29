import React from "react";
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle, TextStyle } from "react-native";
import colors from "../../const/Colors";
import type { ButtonProps } from "../../types/Button";

const Button: React.FC<ButtonProps> = ({ children, onPress, color = "default", style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }): StyleProp<ViewStyle> => [
        styles.buttonContainer,
        color === "blue" && styles.blueButton,
        pressed && styles.pressed,
      ]}
    >
      <View>
        <Text
          style={[
            styles.buttonText,
            color === "blue" && styles.whiteText,
            style as StyleProp<TextStyle>,
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },
  blueButton: {
    backgroundColor: colors.primaryBlue,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: colors.bluedark,
    borderRadius: 4,
  },
  whiteText: {
    color: colors.white,
  },
});
