import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import colors from "../../../const/Colors";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import InvoiceForm from '../../../components/invoice/Form/InvoiceForm'
import { InvoicesContext } from "../../../store/invoices-context";
import { useRoute } from "@react-navigation/native";
import { storeInvoice } from "../../../util/https";
function AddInvoice({navigation}) {

 const onSubmit=(formData)=>{
  console("form sending invoice" + formData)
  storeInvoice(formData)

 }

  return (
    <View style={styles.addInvoiceContainer}>
      <InvoiceForm isEditing={false} onSubmitInvoice={onSubmit}/>
    </View>
  );
}

const styles = StyleSheet.create({
  addInvoiceContainer: {
    marginTop: 5,
    flex: 1,
    backgroundColor: colors.gray,
  },
});
export default AddInvoice;
