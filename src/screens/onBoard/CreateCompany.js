import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "../../components/UI/Button";
import Input from "../../components/invoice/Form/Input";
import colors from "../../const/Colors";
import { fetchCompany, storeCompany } from "../../util/https";
import { InvoicesContext } from "../../store/invoices-context";
import { AuthContext } from "../../store/auth-context";

const initialState = (defaultCompany) => ({
  companylogo: defaultCompany?.companylogo || "",
  phone: defaultCompany?.phone || "",
  companyname: defaultCompany?.companyname || "",
  email: defaultCompany?.email || "",
  address1: defaultCompany?.address1 || "",
  address2: defaultCompany?.address2 || "",
  taxRate: defaultCompany?.taxRate || "",
});

function CreateCompany({ navigation }) {
  const companyCtx = useContext(InvoicesContext);
  const [company, setCompany] = useState(() => initialState(null));
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false); // Track readiness to render the form
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getCompany() {
      try {
        const response = await fetchCompany();
        companyCtx.setCompany(
          response.filter((company) => company.owner === authCtx.userData)
        );
        setCompany(
          initialState(
            response.filter((company) => company.owner === authCtx.userData)
          )
        ); // Use the first company object
        setIsReady(true); // Mark the form as ready
      } catch (error) {
        console.error("Failed to fetch company:", error);
      }
    }
    getCompany();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCompany((prev) => ({ ...prev, companylogo: result.assets[0].uri }));
    }
  };

  const inputHandler = (key, value) => {
    setCompany((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const navigateToAllScreen = async () => {
    const companyData = {
      email: company.email,
      companylogo: company.companylogo,
      taxRate: company.taxRate,
      address1: company.address1,
      address2: company.address2,
      phone: company.companyphone,
      companyname: company.companyname,
      owner: authCtx.userData,
    };
    setIsLoading(true);
    try {
      await storeCompany(companyData);
      setIsLoading(false);
      navigation.navigate("AllSet");
    } catch (error) {
      console.error("Failed to save company:", error);
      setIsLoading(false);
    }
  };

  if (isLoading || !isReady) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.loginInsideContainer}>
        <Text style={styles.companyText}>Your Company Info</Text>
        <View style={styles.inputContainer}>
          <Pressable onPress={pickImage} style={styles.pickLogo}>
            {company.companylogo ? (
              <Image
                source={{ uri: company.companylogo }}
                style={styles.imagePreview}
              />
            ) : (
              <>
                <Octicons name="image" size={44} color="black" />
                <Text>Pick a logo</Text>
              </>
            )}
          </Pressable>
        </View>
        <View style={styles.companyNameContainer}>
          <TextInput
            placeholder="Company name"
            style={styles.input}
            value={company.companyname}
            onChangeText={(value) => inputHandler("companyname", value)}
          />
          <View style={styles.line}></View>
          <TextInput
            placeholder="Tax Rate"
            style={styles.input}
            value={company.taxRate}
            onChangeText={(value) => inputHandler("taxRate", value)}
          />
        </View>
        <View style={styles.companyNameContainer}>
          <TextInput
            placeholder="Company phone"
            style={styles.input}
            value={company.phone}
            onChangeText={(value) => inputHandler("phone", value)}
          />
          <View style={styles.line}></View>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            value={company.email}
            onChangeText={(value) => inputHandler("email", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Address line 1"
            style={styles.input}
            value={company.address1}
            onChangeText={(value) => inputHandler("address1", value)}
          />
          <View style={styles.line}></View>
          <TextInput
            placeholder="Address line 2"
            style={styles.input}
            value={company.address2}
            onChangeText={(value) => inputHandler("address2", value)}
          />
        </View>

        <View style={styles.nextButtonContainer}>
          <Button color="blue" onPress={navigateToAllScreen}>
            <Text style={styles.buttonText}>
              Save <AntDesign name="right" size={24} color="white" />
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
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
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  nextButtonContainer: {
    marginTop: 10,
    padding: 20,
  },
  buttonText: {
    textAlign: "center",
  },
  alignItems: "center",
});

export default CreateCompany;
