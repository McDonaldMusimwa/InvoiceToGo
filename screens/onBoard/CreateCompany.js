import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import Button from "../../components/UI/Button";
import colors from "../../const/Colors";
import * as ImagePicker from "expo-image-picker";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
function CreateCompany({ navigation }) {
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
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="email@gmail.com" style={styles.input} />
          <View style={styles.line}></View>
          <TextInput placeholder="password" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Adsress line 1" style={styles.input} />
          <View style={styles.line}></View>
          <TextInput placeholder="Address line 2" style={styles.input} />
        </View>
        <View style={styles.nextButtonContainer}>
          <Button color="blue" onPress={navigateToAllScreen}>
            Next
            <Text><AntDesign name="right" size={24} color="white" /></Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  loginInsideContainer: {
    marginTop: 150,
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
    height: 120,
    width: "90%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    marginVertical: 10,
  },
  line: {
    backgroundColor: colors.black,
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
    marginTop: 25,
  },
});
export default CreateCompany;
