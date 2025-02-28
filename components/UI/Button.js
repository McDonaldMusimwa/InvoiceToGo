import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../const/Colors";

function Button({ children, onPress, color,style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.pressed : "null")}
    >
      <View
        style={[
          styles.buttonContainer,
          color === "blue" ? styles.blueButton : "null",
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.buttonText,
            color === "blue" ? styles.whiteText : "null",style
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

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
export default Button;
