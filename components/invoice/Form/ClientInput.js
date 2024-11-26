import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import colors from "../../../const/Colors";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

function ClientInput() {
  const [client, setClient] = useState("");
  const navigation = useNavigation();

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
        style={styles.datePressable}
      >
        <Text style={styles.clientnameText}>
          For :    {client}

        {"                                     "}
     <AntDesign name="right" size={20} color="black" />
        </Text>
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
  datePressable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  clientnameText: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection:'row'
  },
});

export default ClientInput;
