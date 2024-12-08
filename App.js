import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigatorTab from "./components/UI/BottomTab";
import Login from "./screens/onBoard/Login";
import Onboard from "./screens/onBoard/Onboard";
import CreateCompany from "./screens/onBoard/CreateCompany";
import AllSet from "./screens/onBoard/AllSet";
import Settings from "./screens/settings/Settings";
import AddInvoice from "./screens/invoice/manageInvoice";
import SelectClient from "./screens/clients/SelectClients";
import InvoicesContectProvider from "./store/invoices-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ManageClient from "./screens/clients/ManageClient";
import ModifyInvoice from "./screens/invoice/modify/ModifyInvoice";
import Invoicetemplate from "./components/invoice/Ui/Invoicetemplate";
//import InvoiceForm from './components/invoice/InvoiceForm'
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="auto" />
      <InvoicesContectProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Previous"
              component={BottomNavigatorTab}
              options={{
                headerShown: false,
                headerLeft: () => {
                  <FontAwesome5 name="search" size={24} color="black" />;
                },
              }} // Hide the default header for Bottom Tabs
            />
            {/*  
            <Stack.Screen
              name="Onboard"
              component={Onboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
*/}
            <Stack.Screen
              name="CreateCompany"
              component={CreateCompany}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AllSet"
              component={AllSet}
              options={{ headerShown: false }} // Hide the default header for Bottom Tabs
            />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen
              name="Manage"
              component={AddInvoice}
              options={{ title: "Manage invoices" }}
            />
            <Stack.Screen
              name="Selectclient"
              component={SelectClient}
              options={{ title: "Select Client" }}
            />

            <Stack.Screen
              name="ManageClient"
              component={ManageClient}
              options={{
                title: "",
              }}
            />

            <Stack.Screen name="ManageInvoice" component={AddInvoice} />
            <Stack.Screen name="ModifyInvoice" component={ModifyInvoice} />
            <Stack.Screen
              name="Invoicetemplate"
              component={Invoicetemplate}
              options={{
                title: "Invoice",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </InvoicesContectProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
