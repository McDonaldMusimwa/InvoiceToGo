import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { useContext, useEffect } from "react";
import colors from "../../const/Colors";
import { InvoicesContext } from "../../store/invoices-context";
import ClientForInvoice from "../../components/client/clientForInvoice";
import Button from "../../components/UI/Button";
import { fetchClients } from "../../util/https";

const width = Dimensions.get("window").width;

function ClientInput({ navigation }) {
  const clientCtx = useContext(InvoicesContext);

  // Fetch clients on component mount
  useEffect(() => {
    async function getClients() {
      try {
        const clients = await fetchClients(); // Fetch clients from backend
        clientCtx.setClients(clients); // Update context with fetched clients
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    }
    getClients();
  }, [clientCtx.clients]);

  function selectHandler(id) {
    const selectedClient = clientCtx.clients.find((client) => client.id === id);
    if (selectedClient) {
      navigation.navigate("ManageClient", { client: selectedClient });
      
    }
  }

  //console.log(clientCtx.clients)

  return (
    <View style={styles.inputBackground}>
      <FlatList
        data={clientCtx.clients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClientForInvoice
            name={item.clientname}
            phone={item.clientphone}
            email={item.clientemail}
            onPress={() => selectHandler(item.id)}
            id={item.id}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("ManageClient")}
          color="blue"
        >
          Add Client +
        </Button>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: width / 3,
    zIndex: 100,
    alignItems: "center",
    padding: 10,
  },
  inputBackground: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
});

export default ClientInput;
