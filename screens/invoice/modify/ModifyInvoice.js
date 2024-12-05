import { useContext } from "react";
import { View } from "react-native";
import InvoiceForm from "../../../components/invoice/Form/InvoiceForm";
import { InvoicesContext } from "../../../store/invoices-context";
function ModifyInvoice({route}){
    const invoiceCtx = useContext(InvoicesContext)
    const invoiceId = route.params.invoiceid
    const invoiceArray = invoiceCtx.invoices.filter((invoice)=> invoice.id === invoiceId)
    const invoice = invoiceArray[0]


return(<View>
        <InvoiceForm defaultInvoice={invoice} isEditing={true}/>
    </View>)


}


export default ModifyInvoice