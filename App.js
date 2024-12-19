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
import SignUp from "./screens/onBoard/SignUp";
import colors from "./const/Colors";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext,useEffect } from "react";
import DashBoard from "./screens/Analytics/Dashboard";
import * as Notifications from 'expo-notifications';

//import InvoiceForm from './components/invoice/InvoiceForm'
const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: "white",
        contentStyle: { backgroundColor: colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <InvoicesContectProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: colors.primary100 },
        }}
      >
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
        <Stack.Screen
        name="CreateCompany"
        component={CreateCompany}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="Analytics"
      component={DashBoard}
      options={{ headerShown: false }}
    />
      </Stack.Navigator>
    </InvoicesContectProvider>
  );
}
export const triggerNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test Notification",
      body: "This is a test notification!",
    },
    trigger: { seconds: 2 }, // Schedule after 2 seconds
  });
};

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
export default function App() {
  useEffect(() => {
    async function getPermissions() {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        alert('You need to enable permissions for notifications.');
        return;
      }
    }

    getPermissions();
  }, []);




  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
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
