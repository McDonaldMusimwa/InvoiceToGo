import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import ClientForInvoice from "../../components/client/clientForInvoice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { InvoicesContext } from "../../store/invoices-context";
import { fetchClients } from "../../util/https";
function SelectClient() {
  const clientCtx = useContext(InvoicesContext);

  const route = useRoute();
  const navigation = useNavigation();

  function selectHandler(id) {
    const selectedClient = clientCtx.clients.find((client) => client.id === id);

    route.params.onGoBack(selectedClient);
    navigation.goBack();
  }
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
  }, []);

  return (
    <View style={styles.clientContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  clientContainer: {
    margin: 10,
    flex: 1,
  },
});

export default SelectClient;
