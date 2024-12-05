import { View,Text ,StyleSheet,FlatList} from "react-native"
import { useContext } from "react"
import { InvoicesContext } from "../../../store/invoices-context"
import Invoice from "../../../components/UI/Invoice"

function Modify({navigation}){
    const invoicesCtx = useContext(InvoicesContext)
    const filteredInvoices = invoicesCtx.invoices;


    const renderItem = ({ item }) => {
        const initialValue = 0;
        const subTotal = item.elements.reduce(
          (total, inv) => total + inv.units * inv.unitcost,
          initialValue
        );
    
        const onPressNavigate = () => {
       
          navigation.navigate("ModifyInvoice", { invoiceid: item.id });
        };
        return (
          <Invoice
            invoicenumber={item.invoicenumber}
            subTotal={subTotal}
            status={item.status}
            customer={item.clientname}
            onPressAction={onPressNavigate}
          />
        );
      };


    return <View>
    <View style={styles.invoicesSection}>
        <FlatList
          data={filteredInvoices}
          renderItem={renderItem}
          keyExtractor={(item) => item.invoicenumber.toString()}
        />
      </View>
    </View>
}
const styles=StyleSheet.create({
    invoicesSection:{

    }
})

export default Modify