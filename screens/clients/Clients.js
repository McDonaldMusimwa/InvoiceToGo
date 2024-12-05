import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import colors from "../../const/Colors";
import { InvoicesContext } from "../../store/invoices-context";
import ClientForInvoice from "../../components/client/clientForInvoice";
import Button from "../../components/UI/Button";
import { fetchClients } from "../../util/https";
const width = Dimensions.get("window").width;

function ClientInput({ navigation }) {
  const clientCtx = useContext(InvoicesContext);
  const clients = clientCtx.clients;
  useEffect(()=>{
    async function getClients(){
      const clients =await fetchClients()
      clientCtx.setClients(clients)
    }

    getClients
  },[])

  function selectHandler(id) {
    const selectedClient = clients.find((client) => client.id === id);

    navigation.navigate("ManageClient", { params: selectedClient });
  }
  return (
    <View style={styles.inputBackground}>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClientForInvoice
            name={item.name}
            phone={item.phone}
            email={item.email}
            onPress={() => selectHandler(item.id)}
            id={item.id}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.navigate("ManageClient");
          }}
          color="blue"
        >
          Add Client +
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: width / 3,
    zIndex: 100,
    alignItems: "center",
    padding: 10, // Adjust padding as needed
  },
  inputBackground: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  clientInputPressable: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  clientnameText: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default ClientInput;
