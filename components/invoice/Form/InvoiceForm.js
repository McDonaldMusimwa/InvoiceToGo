import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Dropdown from "react-native-input-select";
import { taxRate } from "../../../const/Data";
import { useState, useEffect, useMemo } from "react";
import Input from "./Input";
import colors from "../../../const/Colors";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import ClientInput from "./ClientInput";
import InvoiceElements from "./InvoiceElements";
import DiscountTotal from "./DiscountTotal";
import Button from "../../UI/Button";

const initialState = {
  clientname: "",
  invoicenumber: "",
  invoicestatus: "",
  invoicedate: dayjs(), // Always initialize as a Day.js object
  invoiceelements: [],
  discount: "",
  tax: "",
};

function InvoiceForm() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  //const [clientModal, setClientModal] = useState(false);
  const [elements, setinvoiceElements] = useState([]);
  const [invoiceInput, setInvoiceInput] = useState(initialState);

  function inputHandler(key, input) {
    setInvoiceInput((prevState) => ({
      ...prevState,
      [key]: key === "invoicedate" ? dayjs(input || dayjs()) : input,
    }));
  }

  function extractElements(elementsArray) {
    //console.log("Extracted elements:", elementsArray);
    setinvoiceElements(elementsArray); // Set state with the latest elements
  }

  function extractClientName(name) {
    inputHandler("clientname", name);
  }
  //console.log("Updated elements:", JSON.stringify(elements, null, 2));

  function submitForm() {
    if (!validateInputs(invoiceInput)) return;

    const formData = {
      ...invoiceInput,
      invoiceelements: elements,
      tax: taxAmount.toFixed(2),
      balancedue: total.toFixed(2),
    };
    console.log("Submitting invoice:", formData);

    setInvoiceInput(initialState);
    setinvoiceElements([]);
  }

  function validateInputs(inputs) {
    // Check required fields
    return inputs.clientname && inputs.invoicenumber && inputs.invoicedate;
  }

  const subtotal = useMemo(
    () =>
      elements.reduce(
        (total, item) => total + Number(item.units) * Number(item.costperitem),
        0
      ),
    [elements]
  );

  const taxAmount = useMemo(
    () => (taxRate / 100) * (subtotal - Number(invoiceInput.discount || 0)),
    [subtotal, invoiceInput.discount]
  );

  const total = useMemo(
    () => subtotal - Number(invoiceInput.discount || 0) + taxAmount,
    [subtotal, invoiceInput.discount, taxAmount]
  );

  //console.log("Current invoicedate:", invoiceInput.invoicedate);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.invoiceFormContainer}>
          {/* Row for Invoice Number and Invoice Date */}
          <View style={[styles.invDateandNum, styles.inputBackground]}>
            <Text>Invoice number</Text>
            <TextInput
              style={styles.invoicenumber}
              placeholder="inv45"
              onChangeText={(invoicenumber) =>
                inputHandler("invoicenumber", invoicenumber)
              }
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
                    date={
                      invoiceInput.invoicedate
                        ? invoiceInput.invoicedate.toDate()
                        : dayjs().toDate()
                    }
                    onChange={(params) => {
                      const selectedDate = params.date || dayjs();
                      inputHandler("invoicedate", selectedDate);
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
          <ClientInput inputHandler={extractClientName} />

          <InvoiceElements extractElements={extractElements} />

          {/* discount area */}
          <View style={styles.inputBackground}>
            <View style={styles.discountView}>
              <Text>Discount</Text>

              <TextInput
                style={styles.input}
                onChangeText={(disc) => inputHandler("discount", disc)}
                keyboardType="numeric"
                returnKeyType={"next"}
              />
            </View>
            <View style={styles.line}></View>
            <View style={styles.discountView}>
              <Text>Tax </Text>
              {console.log("elements to disocunt " + JSON.stringify(elements))}
              {elements && elements.length > 0 ? (
                <Text style={styles.input}>{taxAmount}</Text>
              ) : (
                <Text style={styles.input}></Text>
              )}
            </View>

            <View style={styles.line}></View>
            <View style={styles.discountView}>
              <Text>Total</Text>
              <Text style={styles.input}>{total}</Text>
            </View>

            {/* 
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
        */}
          </View>
          <View style={[styles.invoicestatus, styles.inputBackground]}>
            <Dropdown
              label="Invoice Status"
              placeholder="Select an option..."
              options={[
                { label: "paid", value: "paid" },
                { label: "unpaid", value: "unpaid" },
              ]}
              selectedValue={invoiceInput.invoicestatus}
              onValueChange={(value) => inputHandler("invoicestatus", value)}
              primaryColor={"blue"}
            />
          </View>

          <View style={styles.submitButtonContainer}>
            <Button color="blue" onPress={submitForm}>
              Save
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  invoicenumber: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  invoiceFormContainer: {
    marginTop: 10,
    flexDirection: "column", // Stack elements vertically
    paddingHorizontal: 10,
  },
  inputBackground: {
    backgroundColor: colors.white,
    padding: 5,
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
    paddingVertical: 5,
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
  submitButtonContainer: {
    marginTop: 15,
  },

  /* Discount Area */

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
    padding: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  invoicestatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    padding: 5,
  },
});

export default InvoiceForm;
