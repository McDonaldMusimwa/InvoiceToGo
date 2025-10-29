import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../const/Colors";
import Card from "../../components/UI/Card";
function Elements({navigation}) {
  return (
    <View style={styles.elementsContainer}>
      <Card>
        <Pressable style={styles.component} onPress={()=>navigation.navigate('CreateCompany')}>
          <Text style={styles.text}>Company</Text>
        </Pressable>
      </Card>
      <Card>
        <Pressable style={styles.component} onPress={()=> navigation.navigate('Account')}>
          <Text style={styles.text}>Account</Text>
        </Pressable>
      </Card>
      <Card>
      <Pressable style={styles.component} onPress={()=>navigation.navigate("Analytics")}>
      <Text style={styles.text}>Analytics DashBoard</Text>
      </Pressable>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  elementsContainer: { flex: 1 },
  component: {
    padding: 10,
    backgroundColor: colors.bluelight1,
    marginVertical: 10,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    padding: 10,
    color: colors.white,
    fontSize: 15,
  },
});

export default Elements;
