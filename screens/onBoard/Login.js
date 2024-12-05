import { View, Text, StyleSheet, TextInput } from "react-native";
import colors from "../../const/Colors";
import Button from "../../components/UI/Button";
import { useState } from "react";
var bcrypt = require("bcryptjs");

function Login({ navigation }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function inputHandler(key, value) {
    if (key === "password") {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          console.error("Error generating salt:", err);
          return;
        }
        bcrypt.hash(value, salt, function (err, hash) {
          if (err) {
            console.error("Error hashing password:", err);
            return;
          }
          setInput((current) => ({
            ...current,
            [key]: hash,
          }));
        });
      });
    } else {
      setInput((current) => ({
        ...current,
        [key]: value,
      }));
    }
  }

  function loginHandler() {
    const formData = {
      email: input.email,
      password: input.password,
    };
    console.log(formData);
    navigation.navigate("Previous");
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
});
export default Login;
