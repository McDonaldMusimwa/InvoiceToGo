import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import colors from "../../../const/Colors";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import InvoiceForm from "../../../components/invoice/Form/InvoiceForm";
import { InvoicesContext } from "../../../store/invoices-context";
import { triggerNotification } from "../../../App";
import { useRoute } from "@react-navigation/native";
import { storeInvoice } from "../../../util/https";
function AddInvoice({ navigation }) {
  const invoiceCtx = useContext(InvoicesContext);

  const onConfirm = async (formData) => {
    const id = await storeInvoice(formData);
    invoiceCtx.addInvoice({ ...formData, id: id });
    triggerNotification()
    navigation.navigate('Previous')
  };

  return (
    <View style={styles.addInvoiceContainer}>
      <InvoiceForm isEditing={false} onSubmitInvoice={onConfirm} />
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
