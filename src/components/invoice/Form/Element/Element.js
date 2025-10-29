import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../../../const/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';


function Element({ units, item, costperitem ,deleteElement,id,modifyElement,openModalEdit}) {
  return (
    <Pressable onPress={()=>openModalEdit(true)}>
      <View style={styles.elementContainer}>
        <Text style={styles.item}>{item}</Text>
      
        <View style={styles.figures}>
          <Text style={styles.faintText}>
            {units} x $ {costperitem}
          </Text>

          <Text>$ {+units * +costperitem}</Text>
        </View>
        <View>
        <Pressable onPress={()=>deleteElement(id)}>
        <FontAwesome name="trash-o" size={24} color="black" />
        </Pressable>
        </View>
      </View>
      <View style={styles.line}></View>
    </Pressable>
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
