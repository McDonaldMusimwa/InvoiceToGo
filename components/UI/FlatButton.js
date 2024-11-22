import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../const/Colors";

function FlatButton({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.pressed : "null")}
    >
      <View style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textDecorationLine:'underline',
    color:colors.white,
    fontSize:20,
    textAlign:'center',
    
  },
});

export default FlatButton