import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { useState } from "react";
import Input from "./Input";
import colors from "../../../const/Colors";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import ClientInput from "./ClientInput";
import InvoiceElements from "./InvoiceElements";
import DiscountTotal from "./DiscountTotal";
import Button from "../../UI/Button";

function InvoiceForm() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  //const [clientModal, setClientModal] = useState(false);
  const [invoiceInput, setInvoiceInput] = useState({
    clientname: "",
    invoicenumber: "",
    invoicestatus: "",
    invoicedate: dayjs(),
    invoiceelements: [
      {
        item: "",
        units: "",
        costperunit: "",
      },
    ],
    discount: "",
    tax: "",
    payments: "",
    balancedue: "",
    paymentinfo: "",
    signature: "",
  });

  function inputHandler(key, input) {
    setInvoiceInput((prevState) => ({
      ...prevState,
      [key]: input,
    }));
  }

  function extractElements(key, elements) {
    inputHandler(()=>key, elements);
  }

  function submitForm() {
    const isValid = validateInputs(invoiceInput);
    if (!isValid) {
      alert("Please complete all required fields");
      return;
    }
  
    // Call API or save locally
    console.log("Submitting invoice:", invoiceInput);
  }

  function validateInputs(inputs) {
    // Check required fields
    return inputs.clientname && inputs.invoicenumber && inputs.invoicedate;
  }
  return (
    <View style={styles.invoiceFormContainer}>
      {/* Row for Invoice Number and Invoice Date */}
      <View style={[styles.invDateandNum, styles.inputBackground]}>
        <Input
          label="Invoice Number"
          style={styles.rowInput} // Ensure consistent width
        />
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.datePressable}
        >
          <Text>Invoice Due</Text>
          <Text style={styles.dateLabel}>
            {invoiceInput.invoicedate.format("YYYY-MM-DD")}
          </Text>
        </Pressable>

        {/* Modal for Date Picker */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.dateContainer}>
              <DateTimePicker
                mode="single"
                date={invoiceInput.invoicedate}
                onChange={(params) => {
                  inputHandler("invoicedate", params.date);
                }}
              />
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {/* Input for Client Name */}
      <ClientInput inputHandler={inputHandler} />

      <InvoiceElements extractElements={extractElements} />
      <DiscountTotal extractDiscountData={extractElements} elements={invoiceInput.invoiceelements}/>
      <Button color='blue' onPress={submitForm}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  invoiceFormContainer: {
    marginTop: 10,
    flexDirection: "column", // Stack elements vertically
    paddingHorizontal: 10,
  },
  inputBackground: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
  },
  invDateandNum: {
    marginBottom: 10,
    flexDirection: "row", // Align children in a row
    alignItems: "center",
    justifyContent: "space-between", // Space inputs evenly
  },
  rowInput: {
    flex: 1, // Take equal space in the row
    marginRight: 10, // Add spacing between the Input and Date Picker
  },
  datePressable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  dateLabel: {
    color: colors.black,
    fontSize: 16,
  },
  dateContainer: {
    backgroundColor: colors.white,
    marginTop: 300,
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
  },
  closeModalText: {
    textAlign: "center",
    color: colors.primary,
    marginTop: 10,
  },
  fullWidthInput: {
    marginTop: 20,
  },
  clientContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
});

export default InvoiceForm;
