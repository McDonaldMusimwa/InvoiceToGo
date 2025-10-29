import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import Button from "../../components/UI/Button";
import colors from "../../const/Colors";
import * as ImagePicker from "expo-image-picker";
import Octicons from "@expo/vector-icons/Octicons";

import Input from "../../components/invoice/Form/Input";
import { taxRate } from "../../const/Data";
function Settings({ navigation, defaultCompany }) {
  const initialCompanyState = {
   
    companyname: defaultCompany ? defaultCompany.companyname : "",
    email: defaultCompany ? defaultCompany.email : "",
    address1: defaultCompany ? defaultCompany.address1 : "",
    address2: defaultCompany ? defaultCompany.address2 : "",
    taxRate: defaultCompany ? defaultCompany.taxRate : "",
  };
  const [company, setCompany] = useState(initialCompanyState);
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };



  function navigateToAllScreen() {
    const updateData ={
        email:company.email,
        image:image,
        taxRate:company.taxRate,
        address1:company.address1,
        address2:company.address2
    }
    navigation.navigate("AllSet");
  }
  return (
    <View style={styles.screenContainer}>
      <View style={styles.loginInsideContainer}>
        <Text style={styles.companyText}>Your Company Info</Text>
        <View style={styles.inputContainer}>
          <Pressable onPress={pickImage} style={styles.pickLogo}>
            <Octicons name="image" size={44} color="black" />
            <TextInput placeholder="Company Logo" style={styles.input} />
          </Pressable>
        </View>
        <View style={styles.companyNameContainer}>
          <TextInput placeholder="Company name" style={styles.input} />
          <View style={styles.line}></View>
          <TextInput placeholder="email@gmail.com" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Adsress line 1" style={styles.input} />
          <View style={styles.line}></View>
          <TextInput placeholder="Address line 2" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Tax rate</Text>
          <Input
            textInputConfig={{
              keyboardType: "numeric",
            }}
          />
        </View>
        <View style={styles.nextButtonContainer}>
          <Button color="blue" onPress={navigateToAllScreen}>
            Update
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 20,
  },

  companyText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  companyNameContainer: {
    backgroundColor: colors.white,

    width: "90%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: colors.white,
    padding: 10,
    width: "90%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    marginVertical: 10,
  },
  line: {
    backgroundColor: colors.gray,
    height: 1,
    width: "80%",
  },
  input: {
    width: "100%",
    textAlign: "center",
    height: 50,
    fontSize: 20,
  },
  pickLogo: {
    alignItems: "center",
  },
  nextButtonContainer: {
    marginTop: 10,
    padding: 20,
  },
});
export default Settings;
