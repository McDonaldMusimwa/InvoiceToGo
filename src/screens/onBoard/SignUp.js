import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import colors from "../../const/Colors";
  import Button from "../../components/UI/Button";
  import { useContext, useState } from "react";
  import { createUser } from "../../util/auth";
  import { AuthContext } from "../../store/auth-context";
  function SignUp({ navigation }) {
    const [user, setUser] = useState({
      email: "",
      password: "",
      confirmEmail: "",
      confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [credentialsInvalid, setCredentialsInvalid] = useState({
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
    });
  const authCtx =  useContext(AuthContext)
  
    function inputHandler(key, value) {
      setUser((curr) => {
        return { ...curr, [key]: value };
      });
    }
  
    async function signupHandler() {
        setIsLoading(true);
      const { email, password, confirmEmail, confirmPassword } = user;
  
      const emailIsValid = email.includes("@");
      const passwordIsValid = password.length > 6;
      const emailsAreEqual = email === confirmEmail;
      const passwordsAreEqual = password === confirmPassword;
  
      if (
        !emailIsValid ||
        !passwordIsValid ||
        !emailsAreEqual ||
        !passwordsAreEqual
      ) {
        Alert.alert("Invalid input", "Please check your entered credentials.");
        setCredentialsInvalid({
          email: !emailIsValid,
          confirmEmail: !emailIsValid || !emailsAreEqual,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }
  

      try {
        const token = await createUser(email, password); // Make sure createUser returns a promise
        authCtx.authenticate(token.idToken)
        authCtx.storeUserData(token.userEmail) ;
        navigation.navigate("CreateCompany");
      } catch (err) {
        Alert.alert("Sign Up Failed", "An error occurred. Please try again.");
        setIsLoading(false);
      }
     
    }
  
    if (isLoading) {
      return (
        <View style={styles.centered}>
        <Text>Signing you up wait a moment</Text>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
  
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginInsideContainer}>
          <Text style={styles.loginText}>Sign Up</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="email@gmail.com"
              style={[
                styles.input,
                credentialsInvalid.email && styles.inputInvalid,
              ]}
              onChangeText={(email) => inputHandler("email", email)}
              autoComplete="email"
              autoCapitalize="none"
            />
            <View style={styles.line} />
            <TextInput
              placeholder="Confirm Email"
              style={[
                styles.input,
                credentialsInvalid.confirmEmail && styles.inputInvalid,
              ]}
              onChangeText={(confirmEmail) =>
                inputHandler("confirmEmail", confirmEmail)
              }
              autoCapitalize="none"
            />
            <View style={styles.line} />
            <TextInput
              placeholder="Password"
              style={[
                styles.input,
                credentialsInvalid.password && styles.inputInvalid,
              ]}
              secureTextEntry
              onChangeText={(password) => inputHandler("password", password)}
            />
            <View style={styles.line} />
            <TextInput
              placeholder="Re-enter Password"
              style={[
                styles.input,
                credentialsInvalid.confirmPassword && styles.inputInvalid,
              ]}
              secureTextEntry
              onChangeText={(confirmPassword) =>
                inputHandler("confirmPassword", confirmPassword)
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button color="blue" onPress={signupHandler}>
              Sign Up
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
      padding: 15,
      borderRadius: 8,
      marginHorizontal: "5%",
      marginBottom: 20,
    },
    input: {
      height: 50,
      fontSize: 16,
      paddingHorizontal: 10,
    },
    inputInvalid: {
      borderColor: "red",
      borderWidth: 1,
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
  
  export default SignUp;
  