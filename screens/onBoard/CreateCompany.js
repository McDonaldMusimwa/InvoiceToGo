import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import Button from "../../components/UI/Button";
import colors from "../../const/Colors";
import * as ImagePicker from "expo-image-picker";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Input from "../../components/invoice/Form/Input";
import { taxRate } from "../../const/Data";
;

function CreateCompany({ navigation }) {
  const defaultCompany = {
    email:"",
    address1:"",
    address2:"",
    taxRate:"",
    companyname:""
  }
  const initialCompanyState = {
   
    companyname: defaultCompany ? defaultCompany.companyname : "",
    email: defaultCompany ? defaultCompany.email : "",
    address1: defaultCompany ? defaultCompany.address1 : "",
    address2: defaultCompany ? defaultCompany.address2 : "",
    taxRate: defaultCompany ? defaultCompany.taxRate : "",
  }
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
function inputHandler(key,value){
  setCompany((current)=>({
    ...current,[key]:value
  }))
}
  function navigateToAllScreen() {
    const companyData ={
      email:company.email,
      image:image,
      taxRate:company.taxRate,
      address1:company.address1,
      address2:company.address2
  }

  console.log(companyData)
    //navigation.navigate("AllSet");
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
          <TextInput placeholder="Company name" style={styles.input}  onChangeText={(value)=> inputHandler('companyname',value)}/>
          <View style={styles.line}></View>
          <TextInput placeholder="email@gmail.com" style={styles.input} onChangeText={(value)=> inputHandler('email',value)}/>
       
        </View>
      
        <View style={styles.inputContainer}>
          <TextInput placeholder="Address line 1" style={styles.input} onChangeText={(value)=> inputHandler('address1',value)}/>
          <View style={styles.line}></View>
          <TextInput placeholder="Address line 2" style={styles.input}  onChangeText={(value)=> inputHandler('address2',value)}/>
        </View>
        <View >
        <Input textInputConfig={{
          onChangeText:(value)=>{inputHandler('taxRate',value)}
        }}/>
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
    padding:10
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
export default CreateCompany;
