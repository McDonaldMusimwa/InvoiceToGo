import React from "react";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import Main from "../../screens/main/main";
import Clients from "../../screens/clients/Clients";
import Elements from "../../screens/elements/Elements";
import Settings from "../../screens/settings/Settings";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const BottomTab = createBottomTabNavigator();

// Define type for navigation (optional, but helps in TypeScript)
type RootStackParamList = {
  Invoices: undefined;
  Clients: undefined;
  Elements: undefined;
  Settings: undefined;
};

function BottomNavigatorTab(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#777",
      }}
    >
      {/* 🧾 Invoices Tab */}
      <BottomTab.Screen
        name="Invoices"
        component={Main}
        options={{
          title: "Your Invoices",
          headerLeft: () => (
            <Pressable style={{ marginLeft: 16 }}>
              <FontAwesome5 name="search" size={20} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Settings")}
              style={{ marginRight: 16 }}
            >
              <SimpleLineIcons name="settings" size={22} color="black" />
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 👥 Clients Tab */}
      <BottomTab.Screen
        name="Clients"
        component={Clients}
        options={{
          title: "Clients",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🧩 Elements Tab */}
      <BottomTab.Screen
        name="Elements"
        component={Elements}
        options={{
          title: "Elements",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNavigatorTab;
