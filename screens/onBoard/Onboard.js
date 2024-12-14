import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../const/Colors";
import invoicestack from "../../assets/invoicestack.png";
import Button from "../../components/UI/Button";
import FlatButton from "../../components/UI/FlatButton";
import WhiteInvoice  from '../../assets/invoicewhite.png'

function Onboard({ navigation }) {
  function navigateToLogin() {
    navigation.navigate("Login");
  }
  function navigateToCreateCompany() {
    navigation.navigate("SignUp");
  }
  return (
    <View style={styles.onBoardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={WhiteInvoice}
          style={{ width: 400, height: 400, resizeMode: "fill" }}
          alt="Invoice Stack"
        />
      </View>
      <Text style={styles.boldCaption}>Invoices made simple</Text>
      <Text style={styles.slimCaption}>
        Create Professional invoices in just seconds
      </Text>
      <Button onPress={navigateToCreateCompany}>Start your work</Button>
      <Text style={styles.loginText}>
        Already have an account ?{" "}
        <FlatButton onPress={navigateToLogin}>Login</FlatButton>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  onBoardContainer: {
    backgroundColor: colors.bluelight2,
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    marginTop: 20,
  },
  boldCaption: {
    fontWeight: "bold",
    fontSize: 55,
    color: colors.white,
    marginVertical: 1,
    marginHorizontal: 20,
  },
  slimCaption: {
    fontSize: 25,
    color: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  loginText: {
    color: colors.white,
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

export default Onboard;
