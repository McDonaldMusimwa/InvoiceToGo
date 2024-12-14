import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";
import Main from "../../screens/main/main";
import Clients from "../../screens/clients/Clients";
import Settings from "../../screens/settings/Settings";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Elements from "../../screens/elements/Elements";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Octicons from "@expo/vector-icons/Octicons";
const BottomTab = createBottomTabNavigator();

function BottomNavigatorTab() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        animation: "fade",
      }}
    >
      <BottomTab.Screen
        name="Invoices"
        component={Main}
        options={{
          title: "Your Invoices",
          headerLeft: () => {
            <FontAwesome5 name="search" size={24} color="black" />;
          },
          headerRight:()=>{
            <Pressable onPress={() => navigation.navigate("Settings")}>
            <SimpleLineIcons name="settings" size={24} color="black" />
          </Pressable>
          },
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Clients"
        component={Clients}
        options={{
          title: "Clients",
          tabBarLabel: "Clients",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Elements"
        component={Elements}
        options={{
          title: "Elements",
          tabBarLabel: "Elements",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNavigatorTab;
