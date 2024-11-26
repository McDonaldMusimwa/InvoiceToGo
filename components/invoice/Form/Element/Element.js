import { View, Text, StyleSheet } from "react-native";
import colors from "../../../../const/Colors";

function Element({ units, item, costperitem }) {
  return (
    <View>
      <View style={styles.elementContainer}>
        <Text style={styles.item}>{item}</Text>
        <View style={styles.figures}>
          <Text style={styles.faintText}>
            {units} x $ {costperitem}
          </Text>

          <Text>$ {+units * +costperitem}</Text>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  elementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  item: {
    fontSize: 15,
    fontWeight: "bold",
  },
  figures: {
    flexDirection: "column",
  },
  input: {
    width: "100%",
    textAlign: "center",
    height: 50,
    fontSize: 15,
  },
  faintText: {
    color: colors.primaryBlue,
    textAlign: "right",
  },
  line: {
    backgroundColor: colors.gray,
    height: 1,
    width: "100%",
  },
});

export default Element;
