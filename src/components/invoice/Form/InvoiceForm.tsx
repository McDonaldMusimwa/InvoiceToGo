import React, { useState, useMemo, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import Dropdown from "react-native-input-select";
import { taxRate } from "../../../const/Data";
import colors from "../../../const/Colors";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import ClientInput from "./ClientInput";
import InvoiceElements from "./InvoiceElements";
import Button from "../../UI/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../store/auth-context";
import type { Invoice, InvoiceElement, Client } from "../../../types/Invoice";

interface InvoiceFormProps {
  isEditing?: boolean;
  defaultInvoice?: Invoice;
  onSubmitInvoice: (invoice: Invoice) => void;
}

const initialState = (defaultInvoice?: Invoice): Invoice => ({
  clientname: defaultInvoice?.clientname ?? { name: "", email: "", phone: "" },
  invoicenumber: defaultInvoice?.invoicenumber ?? "",
  invoicestatus: defaultInvoice?.invoicestatus ?? "",
  invoicedate: defaultInvoice?.invoicedate
    ? dayjs(defaultInvoice.invoicedate)
    : dayjs(),
  invoiceelements: defaultInvoice?.invoiceelements ?? [],
  discount: defaultInvoice?.discount ?? "",
  tax: defaultInvoice?.tax ?? "",
});

function InvoiceForm({ isEditing, defaultInvoice, onSubmitInvoice }: InvoiceFormProps) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [elements, setInvoiceElements] = useState<InvoiceElement[]>(
    defaultInvoice ? defaultInvoice.invoiceelements : []
  );
  const [invoiceInput, setInvoiceInput] = useState<Invoice>(
    initialState(defaultInvoice)
  );
  const authCtx = useContext(AuthContext);

  const inputHandler = (key: keyof Invoice, input: any) => {
    setInvoiceInput((prevState) => ({
      ...prevState,
      [key]: key === "invoicedate" ? dayjs(input || dayjs()) : input,
    }));
  };

  const extractElements = (elementsArray: InvoiceElement[]) => {
    setInvoiceElements(elementsArray);
  };

  const extractClientName = (client: Client) => {
    inputHandler("clientname", client);
  };

  const validateInputs = (inputs: Invoice) => {
    return inputs.clientname && inputs.invoicenumber && inputs.invoicedate;
  };

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

  const submitForm = () => {
    if (!validateInputs(invoiceInput)) return;

    const formData: Invoice = {
      ...invoiceInput,
      invoiceelements: elements,
      tax: taxAmount.toFixed(2),
      balancedue: total.toFixed(2),
      user: authCtx.userData,
    };

    onSubmitInvoice(formData);
    setInvoiceInput(initialState(defaultInvoice));
    setInvoiceElements([]);
    navigation.navigate("Previous" as never);
  };

  return (
    <View style={styles.invoiceFormContainer}>
      {/* Invoice number & date */}
      <View style={[styles.invDateandNum, styles.inputBackground]}>
        <Text>Invoice number</Text>
        <TextInput
          style={styles.invoicenumber}
          placeholder="inv45"
          value={invoiceInput.invoicenumber}
          onChangeText={(text) => inputHandler("invoicenumber", text)}
        />

        <Pressable onPress={() => setModalVisible(true)} style={styles.datePressable}>
          <Text>Invoice Due</Text>
          <Text style={styles.dateLabel}>
            {invoiceInput.invoicedate
              ? invoiceInput.invoicedate.format("YYYY-MM-DD")
              : "No date set"}
          </Text>
        </Pressable>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.centeredView}>
            <View style={styles.dateContainer}>
              <DateTimePicker
                mode="single"
                date={invoiceInput.invoicedate.toDate()}
                onChange={(params) =>
                  inputHandler("invoicedate", params.date || dayjs())
                }
              />
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {/* Client input */}
      <ClientInput
        inputHandler={extractClientName}
        defaultValue={defaultInvoice?.clientname ?? { name: "", email: "", phone: "" }}
      />

      {/* Invoice items */}
      <InvoiceElements
        extractElements={extractElements}
        defaultElements={defaultInvoice?.invoiceelements ?? []}
      />

      {/* Discount / Tax / Total */}
      <View style={styles.inputBackground}>
        <View style={styles.discountView}>
          <Text>Discount</Text>
          <TextInput
            value={invoiceInput.discount}
            style={styles.input}
            onChangeText={(disc) => inputHandler("discount", disc)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.line} />

        <View style={styles.discountView}>
          <Text>Tax</Text>
          <Text style={styles.input}>{taxAmount.toFixed(2)}</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.discountView}>
          <Text>Total</Text>
          <Text style={styles.input}>{total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Status */}
      <View style={[styles.invoicestatus, styles.inputBackground]}>
        <Dropdown
          label="Invoice Status"
          placeholder="Select an option..."
          options={[
            { label: "paid", value: "paid" },
            { label: "unpaid", value: "unpaid" },
          ]}
          selectedValue={invoiceInput.invoicestatus}
          onValueChange={(value) =>
            inputHandler("invoicestatus", value as "paid" | "unpaid")
          }
          primaryColor={"blue"}
        />
      </View>

      <View style={styles.submitButtonContainer}>
        <Button color="blue" onPress={submitForm}>
          Save
        </Button>
      </View>
    </View>
  );
}

export default InvoiceForm;

// ---- Styles ----
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
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  inputBackground: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 8,
  },
  invDateandNum: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datePressable: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  dateLabel: { color: colors.black, fontSize: 16 },
  dateContainer: {
    backgroundColor: colors.white,
    marginTop: 300,
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
  },
  closeModalText: { textAlign: "center", color: colors.primary, marginTop: 10 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  submitButtonContainer: { marginTop: 15 },
  input: { width: "70%", textAlign: "right", height: 50, fontSize: 20 },
  line: { backgroundColor: colors.gray, height: 1, width: "100%" },
  discountView: {
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
