import { View, Text, StyleSheet, Pressable, PressableProps } from "react-native";
import React from "react";
// Assuming the path to colors is correct
import colors from "../../const/Colors";


interface FlatButtonProps extends PressableProps {
  children: React.ReactNode;
  onPress: () => void;
}

// Use React.JSX.Element for functional component return type
function FlatButton({ children, onPress, ...restProps }: FlatButtonProps): React.JSX.Element {
  return (
    <Pressable
      {...restProps} // Allows passing additional Pressable props (e.g., accessibility)
      onPress={onPress}
      // Apply the base style (buttonContainer) and then conditionally apply the pressed style
      style={({ pressed }) => [
        styles.buttonContainer,
        // The pressed style will apply if 'pressed' is true
        pressed && styles.pressed, 
      ]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // Base padding/layout styles
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    textDecorationLine: 'underline',
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
  // Style for the pressed state (e.g., slight opacity change)
  pressed: {
    opacity: 0.75, 
  },
});

export default FlatButton;
