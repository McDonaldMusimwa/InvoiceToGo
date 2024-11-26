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
import AddInvoice from "./screens/invoice/addinvoice";
import SelectClient from "./screens/clients/SelectClients";
import InvoiceForm from "./components/invoice/Form/InvoiceForm";
import InvoicesContectProvider from "./store/invoices-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="auto" />
      <InvoicesContectProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MainTabs"
              component={BottomNavigatorTab}
              options={{
                headerShown:false,
                headerLeft: () => {
                  <FontAwesome5 name="search" size={24} color="black" />;
                },
              }} // Hide the default header for Bottom Tabs
            />

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
              name="Addinvoice"
              component={AddInvoice}
              options={{ title: "Add invoice" }}
            />
            <Stack.Screen
              name="Selectclient"
              component={SelectClient}
              options={{ title: "Select Client" }}
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
