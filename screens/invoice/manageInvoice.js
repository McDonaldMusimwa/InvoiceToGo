import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";
import Add from "./addInvoice/AddInvoice";
import colors from "../../const/Colors";
import Modify from "./modify/Modify";

function ManageInvoice({ route, navigation }) {
  const [addScreenNavigate, setNavigate] = useState("add");

  //console.log("Manage screen", JSON.stringify(route.params));
  // Simplifying the screen logic


  const navigateHandler = {
    add: () => {
      setNavigate("add");
    },
    preview: () => {
     
      setNavigate("preview");
    },
  };

  const screen = addScreenNavigate === "add" ? <Add extractInvoiceData={navigateHandler.preview} /> : <Modify navigation={navigation}/>;

  return (
    <View style={styles.addInvoiceContainer}>
      <View style={styles.AddInvoiceNavigate}>
        <View
          style={[
            styles.choice,
            addScreenNavigate === "add" ? styles.chosenMenu : null, // Fix for selected styling
          ]}
        >
          <Text onPress={navigateHandler.add} style={styles.centeredText}>
            Add Invoice
          </Text>
        </View>
        <View
          style={[
            styles.choice,
            addScreenNavigate === "preview" ? styles.chosenMenu : null, // Fix for selected styling
          ]}
        >
          <Text onPress={navigateHandler.preview} style={styles.centeredText}>
          Modify
          </Text>
        </View>
      </View>

      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  addInvoiceContainer: {
    flex: 1,
    marginTop: 1,
  },
  AddInvoiceNavigate: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute menu items
    width: 400,
    height: 35,
  },
  centeredText: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  choice: {
    flex: 1, // Each choice should take up equal space
    paddingVertical: 5,
  },
  chosenMenu: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primaryBlue,
  },
});

export default ManageInvoice;
