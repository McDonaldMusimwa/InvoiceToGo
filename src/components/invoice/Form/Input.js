import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../../../const/Colors";

function Input({ label, textInputConfig, style }) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.textLabel}>{label}</Text>
      <TextInput style={styles.textInput} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { marginHorizontal: 4, marginVertical: 8 },
  textLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 4,
  },
  textInput: {
    color: colors.black,
  
    padding: 6,
    borderRadius: 4,
    fontSize: 18,
    color: colors.black,
  },
  multiLine: {
    textAlignVertical: "top",
  },
});
export default Input;
