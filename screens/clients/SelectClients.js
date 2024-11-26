import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import ClientForInvoice from "../../components/client/clientForInvoice";
import { clients } from "../../const/Data";
import { useNavigation, useRoute } from "@react-navigation/native";
function SelectClient() {

  const route = useRoute()
  const navigation = useNavigation();

  function selectHandler(id) {
    const selectedClient = clients.find((client) => client.id === id);
    route.params.onGoBack(selectedClient.name)
    navigation.goBack();

  }

  return (
    <View style={styles.clientContainer}>


      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
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
