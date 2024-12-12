import { useContext } from "react";
import { View } from "react-native";
import InvoiceForm from "../../../components/invoice/Form/InvoiceForm";
import { InvoicesContext } from "../../../store/invoices-context";
import { updateInvoice } from "../../../util/https";
function ModifyInvoice({ route ,navigation}) {
  const invoiceCtx = useContext(InvoicesContext);
  const invoiceId = route.params.invoiceid;
  const invoiceArray = invoiceCtx.invoices.filter(
    (invoice) => invoice.id === invoiceId
  );
  const invoice = invoiceArray[0];
  const onConfirm =(formData) => {
    console.log(formData)
    invoiceCtx.updateInvoice(invoiceId, formData);
    updateInvoice(invoiceId, formData);
    navigation.navigate('Previous')
  };

  return (
    <View>
      <InvoiceForm
        defaultInvoice={invoice}
        isEditing={true}
        onSubmitInvoice={onConfirm}
      />
    </View>
  );
}

export default ModifyInvoice;
