import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../../../const/Colors";
import Input from "./Input";

function DiscountTotal({ extractDiscountData,elements }) {
    console.log(elements)
  return (
    <View style={styles.inputBackground}>
      <View style={styles.discountView}>
        <Text>Discount</Text>

        <TextInput
          style={styles.input}
          onChangeText={(disc) => extractDiscountData("discount", disc)}
          keyboardType="numeric"
          returnKeyType={"next"}
        />
      </View>
      <View style={styles.line}></View>
      <View style={styles.discountView}>
        <Text>Tax rate</Text>
        <TextInput
          style={styles.input}
          onChangeText={(tax) => extractDiscountData("tax", tax)}
          keyboardType="numeric"
          returnKeyType={"next"}
        />
      </View>

      <View style={styles.line}></View>
      <View style={styles.discountView}>
        <Text>Total</Text>

        <TextInput style={styles.input} />
      </View>

      <View style={styles.line}></View>
      <View style={styles.discountView}>
        <Text>Payments</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          returnKeyType={"next"}
        />
      </View>
      <View style={styles.line}></View>

      <View style={styles.discountView}>
        <Text>Balance due</Text>
        <TextInput style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBackground: {
    marginTop: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
  },
  inputContainer: {
    backgroundColor: colors.white,
    height: 150,
    width: "80%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%",
    marginBottom: 20,
  },
  input: {
    width: "70%",
    textAlign: "right",
    height: 50,
    fontSize: 20,
  },
  line: {
    backgroundColor: colors.gray,
    height: 1,
    width: "100%",
  },
  discountView: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default DiscountTotal;
