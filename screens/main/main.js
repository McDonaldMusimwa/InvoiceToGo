import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useState, useContext,useEffect } from "react";
import invoices from "../../const/Data";
import { Dimensions } from "react-native";
import colors from "../../const/Colors";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Button from "../../components/UI/Button";
import Invoice from "../../components/UI/Invoice";
import { InvoicesContext } from "../../store/invoices-context";
import { fetchInvoices } from "../../util/https";
const width = Dimensions.get("window").width;


function Main({ navigation }) {
  const invoicesCtx = useContext(InvoicesContext);
  const [filteredInvoices, setFilteredInvoices] = useState(invoicesCtx.invoices);
  const [screen, setScreen] = useState("all");


  useEffect(() => {
    async function getInvoices() {
      try {
        const invoices = await fetchInvoices();
        invoicesCtx.setInvoices(invoices); // Store as array
        setFilteredInvoices(invoices);    // Initialize filteredInvoices
      } catch (error) {
        console.error("Error fetching invoices: ", error);
      }
    }
    getInvoices();
  }, []);
  



  const navigateHandlers = {
    navigateToUnpaid: () => {
      const invoices = invoicesCtx.invoices.filter(
        (invoice) => invoice.invoicestatus === "unpaid"
      );
      setScreen("unpaid");
      setFilteredInvoices(invoices);
    },
    navigateToPaid: () => {
      const invoices = invoicesCtx.invoices.filter(
        (invoice) => invoice.invoicestatus === "paid"
      );
      setScreen("paid");
      setFilteredInvoices(invoices);
    },
    navigateToAll: () => {
      setScreen("all");
      setFilteredInvoices(invoicesCtx.invoices);
    },
  };
  

  const renderItem = ({ item }) => {
    const subTotal = item.invoiceelements.reduce((total, inv) => {
      return total + Number(inv.units) * Number(inv.costperitem);
    }, 0);
  
    const onPressNavigate = () => {
      navigation.navigate("Invoicetemplate", { invoiceid: item.id });
    };
  
    return (
      <Invoice
        invoicenumber={item.invoicenumber}
        subTotal={subTotal.toFixed(2)}
        status={item.invoicestatus}
        customer={item.clientname}
        onPressAction={onPressNavigate}
      />
    );
  };
  

  return (
    <View style={styles.invoicesContainer}>
      <View style={styles.invoicesTop}>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <SimpleLineIcons name="settings" size={24} color="black" />
        </Pressable>

        <Octicons name="search" size={24} color="black" />
      </View>
      <View style={styles.invoicesNavigationContainer}>
        <View style={[screen === "all" ? styles.chosenMenu : null]}>
          <Text
            onPress={navigateHandlers.navigateToAll}
            style={styles.menuText}
          >
            All
          </Text>
        </View>
        <View style={[screen === "unpaid" ? styles.chosenMenu : null]}>
          <Text
            onPress={navigateHandlers.navigateToUnpaid}
            style={styles.menuText}
          >
            Unpaid
          </Text>
        </View>
        <View style={[screen === "paid" ? styles.chosenMenu : null]}>
          <Text
            onPress={navigateHandlers.navigateToPaid}
            style={styles.menuText}
          >
            Paid
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.navigate("Manage");
          }}
          color="blue"
        >
          Add Job +
        </Button>
      </View>
      <View style={styles.invoicesSection}>
        <FlatList
          data={filteredInvoices}
          renderItem={renderItem}
          keyExtractor={(item) => item.invoicenumber.toString()}
        />
      </View>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 10,
   width:'%100',
    zIndex: 100,
    alignItems: "center",
    padding: 10, // Adjust padding as needed
  },
  invoicesTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  invoicesContainer: {
    flex: 1,
  },
  invoicesNavigationContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  invoicesSection: {
    zIndex: -1,
  },
  chosenMenu: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primaryBlue,
  },
  menuText: {
    fontSize: 20,
    marginBottom: 5,
  },
});
export default Main;
