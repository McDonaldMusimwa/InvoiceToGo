import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import colors from "../../../const/Colors";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const initialState=(defaultValue)=>({
name:defaultValue?.name ?? "",
email:defaultValue?.email ??"",
phone:defaultValue?.phone ??""
})
function ClientInput({ inputHandler, defaultValue }) {
  console.log('default client input' + JSON.stringify(defaultValue))
  const [client, setClient] = useState(()=>initialState(defaultValue));

  const navigation = useNavigation();
  useEffect(() => {
    if (client) inputHandler(client);
  }, [client]);
  return (
    <View style={styles.inputBackground}>
      <Pressable
        onPress={() => {
          navigation.navigate("Selectclient", {
            onGoBack: (clientData) => {
              setClient(clientData);
            },
          });
        }}
        style={styles.clientInputPressable}
      >
        <Text style={styles.clientnameText}>
          For : {client.name}
          {"                                     "}
        </Text>
        <AntDesign name="right" size={20} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBackground: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
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
