import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { useState } from "react";
import colors from "../../../const/Colors";
import Element from "../Form/Element/Element";

function InvoiceElements(props) {
  const [modalState, setModalState] = useState(false);
  const [elements, setElements] = useState([]);
  const [element, setElement] = useState({
    item: "",
    units: "",
    costperitem: "",
  });

  function addInvoiceElement(key, incomingInput) {
    setElement((current) => ({
      ...current,
      [key]: incomingInput,
    }));
  }

  function submitElement() {
    const updatedElements = [...elements, element];
    console.log("invoice elements" + JSON.stringify(updatedElements))
    setElements(updatedElements);
    setElement({ item: "", units: "", costperitem: "" }); // Reset form
    props.extractElements(updatedElements); // Use the updated array
    setModalState(false); // Close modal
  }

  function calculateElementTotal(total, element) {
    return total + element.units * element.costperitem;
  }

  const total = elements.reduce(calculateElementTotal, 0);

  return (
    <View style={styles.inputBackground}>
      {/* Display Added Elements */}
      <FlatList
        data={elements}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Element
            units={item.units}
            costperitem={item.costperitem}
            item={item.item}
          />
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalState}
        onRequestClose={() => setModalState(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Item"
              value={element.item}
              onChangeText={(text) => addInvoiceElement("item", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Units"
              value={element.units}
              keyboardType="numeric"
              onChangeText={(text) => addInvoiceElement("units", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cost Per Item"
              keyboardType="decimal-pad"
              value={element.costperitem}
              onChangeText={(text) => addInvoiceElement("costperitem", text)}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={submitElement}
            >
              <Text style={styles.textStyle}>Add Item</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.addElementContainer}>
        <Button title="Add Element +" onPress={() => setModalState(true)} />
      </View>

      <View style={styles.line}></View>
      <View style={styles.subTotalContainer}>
        <Text style={styles.subTotal}>SubTotal </Text>
        <Text>$ {total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addElementContainer: {
    justifyContent: "left",
    alignItems: "left",
    padding: 10,
  },
  inputBackground: {
    marginTop: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
  },
  line: {
    backgroundColor: colors.gray,
    height: 1,
    width: "100%",
  },

  subTotal: {
    padding: 5,
    fontWeight: "bold",
    fontSize: 15,
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.bluelight1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    textAlign: "center",
    height: 50,
    fontSize: 20,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  subTotalContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default InvoiceElements;
