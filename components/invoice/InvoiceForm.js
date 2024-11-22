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
import colors from "../../const/Colors";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
//import { clients } from "../../const/Data";
//import ClientForInvoice from "../client/clientForInvoice";

function InvoiceForm() {
  const route = useRoute()

  const selectedClient = route.params?.client;
  console.log(route)
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
          <View style={styles.dateContainer}>
            <DateTimePicker
              mode="single"
              date={invoiceInput.invoicedate}
              onChange={(params) => {
                inputHandler("invoicedate", params.date);
              }}
            />
          </View>
          <Pressable onPress={() => setModalVisible(false)}>
            <Text style={styles.closeModalText}>Close</Text>
          </Pressable>
        </Modal>
      </View>

      {/* Input for Client Name */}
      <View style={styles.inputBackground}>
        <Pressable
          onPress={() => {
            navigation.navigate('Selectclient')
          }}
          style={styles.datePressable}
        >
          <Text style={styles.clientnameText}>
            Client name
            <AntDesign name="down" size={20} color="black" />
          </Text>
        </Pressable>
        <Input />
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  clientnameText: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
});

export default InvoiceForm;
