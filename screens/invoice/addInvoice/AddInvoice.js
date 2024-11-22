import { View, StyleSheet } from "react-native";
import { useState } from "react";
import colors from "../../../const/Colors";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import InvoiceForm from '../../../components/invoice/InvoiceForm'

function AddInvoice() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(dayjs());
  console.log(date);

  return (
    <View style={styles.addInvoiceContainer}>
      <InvoiceForm />
    </View>
  );
}

const styles = StyleSheet.create({
  addInvoiceContainer: {
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.gray,
  },
});
export default AddInvoice;
