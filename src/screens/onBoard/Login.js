import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import colors from "../../const/Colors";
import Button from "../../components/UI/Button";
import { useState, useContext } from "react";
import { loginUser } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";

function Login({ navigation }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  function inputHandler(key, value) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function loginHandler() {
    setIsLoading(true);
    const { email, password } = input;

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }

    try {
      const token = await loginUser(email, password); // Make sure createUser returns a promise
      console.log("response login screen response =>"+ JSON.stringify(token))
      authCtx.authenticate(token.idToken);
      authCtx.storeUserData(token.userEmail)
      
    } catch (err) {
      Alert.alert("Sign in Failed", "An error occurred. Please try again.");
      setIsLoading(false);
    }
 
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Logging you in</Text>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginInsideContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            onChangeText={(email) => inputHandler("email", email)}
            autoComplete="email"
            autoCapitalize="none"
          />
          <View style={styles.line}></View>
          <TextInput
            placeholder="password"
            style={styles.input}
            secureTextEntry
            onChangeText={(password) => inputHandler("password", password)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button color="blue" onPress={loginHandler}>
            Login
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: colors.gray,
    marginTop: 50,
    padding: 10,
  },
  loginInsideContainer: {
    marginTop: 150,
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  line: {
    backgroundColor: colors.gray,
    height: 1,
    width: "80%",
  },
  inputContainer: {
    backgroundColor: colors.white,
    height: 150,

    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: 20,
  },
  input: {
    textAlign: "center",
    height: 50,
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 10,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Login;