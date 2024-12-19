import { View, Textm, StyleSheet } from "react-native";
import ManageClientForm from "../../components/client/ManageClientForm";
import { storeClient } from "../../util/https";
import { useContext } from "react";
import { InvoicesContext } from "../../store/invoices-context";

function ManageClient({ route, navigation }) {
    const selectClient = route.params?.client || null;
const invoicesCtx = useContext(InvoicesContext)

    async function onSubmitHandler(clientData) {
        try {
          await storeClient(clientData);
          invoicesCtx.addClient(clientData)

          navigation.goBack(); // Navigate back to client list
        } catch (error) {
          console.error("Error saving client: ", error);
        }
      }
  return (
    <View style={styles.manageClientBackground}>
      <ManageClientForm
        defaultValue={
          selectClient || {
            clientname: "",
            clientphone: "",
            clientemail: "",
            comments: "",
          }
        }
        isEditing={!!selectClient} // Boolean flag for editing state
        onSubmitHandler={onSubmitHandler}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  manageClientBackground: {
    flex: 1,
  },
});
export default ManageClient;
