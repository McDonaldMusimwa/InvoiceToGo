import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../../components/UI/Button";
function AllSet({ navigation }) {
    function navigateToCreateInvoice(){
        navigation.navigate('MainTabs')
    }
  return (
    <View style={styles.screenContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={require("../../assets/invoicestack.png")}
        style={{ width: 400, height: 400, resizeMode: "cover" }}
        alt="Invoice"
      />
      </View>
      <Text style={styles.allsettextheader}>All set up</Text>
      <Text style={[styles.allsettext]}>
        You are ready to create your first invoice
      </Text>
      <Button color="blue" onPress={navigateToCreateInvoice}>Create Invoice</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  allsettextheader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginVertical:20
  },
  allsettext: {
    fontSize: 18,textAlign:'center',
    marginVertical:20
  },
  imageContainer:{
    marginTop:150
  }
});

export default AllSet;
