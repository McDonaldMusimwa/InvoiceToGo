import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../const/Colors";
import invoicestack from "../../assets/invoicestack.png";
import Button from "../../components/UI/Button";
import FlatButton from "../../components/UI/FlatButton";

function Onboard({ navigation }) {
  function navigateToLogin() {
    console.log(navigation);
    navigation.navigate("Login");
  }
  function navigateToCreateCompany(){
    navigation.navigate('CreateCompany')
  }
  return (
    <View style={styles.onBoardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/electricbill.png")}
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
        Already have an account ? <FlatButton onPress={navigateToLogin}>Login</FlatButton>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  onBoardContainer: {
    backgroundColor: colors.bluelight2,
    flex: 1,
  },
  imageContainer: {
    marginTop: 40,
  },
  boldCaption: {
    fontWeight: "bold",
    fontSize: 65,
    color: colors.white,
    marginVertical: 1,
    marginHorizontal: 20,
  },
  slimCaption: {
    fontSize: 25,
    color: colors.white,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  loginText: {
    color: colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
});

export default Onboard;
