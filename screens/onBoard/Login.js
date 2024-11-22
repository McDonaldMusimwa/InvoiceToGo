import { View, Text, StyleSheet, TextInput } from "react-native";
import colors from "../../const/Colors";
import Button from "../../components/UI/Button";

function Login({navigation}) {
  function loginHandler(){
    navigation.navigate('MainTabs')
  }
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginInsideContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="email@gmail.com" style={styles.input} />
          <View style={styles.line}></View>
          <TextInput placeholder="password" style={styles.input} />
        </View>
        <Button color='blue' onPress={loginHandler}>Login</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: colors.gray,
    marginTop: 50,
  },
  loginInsideContainer: {
    marginTop:150
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  line: {
    backgroundColor: colors.black,
    height: 1,
    width: "80%",
  },
  inputContainer: {
    backgroundColor: colors.white,
    height: 150,
    width: "80%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    textAlign: "center",
    height: 50,
    fontSize: 20,
  },
});
export default Login;
