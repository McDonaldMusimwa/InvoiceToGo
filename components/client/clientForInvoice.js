import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Card from "../UI/Card";

function ClientForInvoice({ name, phone, email, onPress }) {
  const route = useRoute();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <Card>
        <View style={styles.client}>
          <View>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.contact}>
            <Text style={styles.phone}>{phone}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 8,
    overflow: "hidden", // Ensures ripple effect or pressed style stays within bounds
  },
  pressed: {
    opacity: 0.75, // Provides visual feedback when pressed
  },
  client: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "column", // Stack name and contact vertically
    backgroundColor: "#f8f9fa", // Light background for card content
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10, // Adds spacing between name and contact info
  },
  contact: {
    marginTop: 10,
  },
  phone: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#007BFF", // Blue color for email to mimic links
  },
});

export default ClientForInvoice;
