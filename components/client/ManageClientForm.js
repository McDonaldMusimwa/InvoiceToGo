import { View, Text, StyleSheet } from "react-native";
import Input from "../invoice/Form/Input";
import { useState } from "react";
import Button from "../UI/Button";
import colors from "../../const/Colors";

function ManageClientForm({
  onCancel,
  onSubmitHandler,
  isEditing,
  defaultValue,
}) {
  const initialInputState = {
    clientname: defaultValue? defaultValue.clientname : "",
    clientphone: defaultValue? defaultValue.clientphone : "",
    clientemail: defaultValue? defaultValue.clientemail : "",
    comments: defaultValue? defaultValue.comments : "",
  };
  const [input, setInputHandler] = useState(initialInputState);

  function inputHandler(key, incomingInput) {
    setInputHandler((currentState) => {
      return {
        ...currentState,
        [key]: incomingInput,
      };
    });
  }

  function submitHandler() {
    if (!input.clientname.trim()) {
      alert("Client name is required.");
      return;
    }
    if (!input.clientphone) {
      alert("Phone number must be 10 digits.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(input.clientemail)) {
      alert("Invalid email address.");
      return;
    }
    const submitData = {
      clientname: input.clientname,
      clientphone: input.clientphone,
      clientemail: input.clientemail,
      comments: input.comments,
    };
    onSubmitHandler(submitData);
    setInputHandler(initialInputState)
  }

  return (
    <View style={styles.formContainer}>
    <Text style={styles.title}>{isEditing ? 'Modify Client' : 'Add Client'}</Text>
      <View style={styles.topFormElements}>
        <Input
          style={styles.rowInput}
          label="Client Name"
          textInputConfig={{
            onChangeText: inputHandler.bind(this, "clientname"),
            value: input.clientname,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Client Phone"
          keyboardType="numeric"
          textInputConfig={{
            placeholder: "000 000 000",
            maxLength: "10",
            onChangeText: inputHandler.bind(this, "clientphone"),
            value: input.clientphone,
          }}
        />

        <Input
          label="Client Email"
          style={styles.rowInput}
          keyboardType="email"
          textInputConfig={{
            maxLength: 20,
            onChangeText: inputHandler.bind(this, "clientemail"),
            value: input.clientemail,
          }}
        />
      </View>

      <Input
        label="Comments"
        style={styles.rowInput}
        textInputConfig={{
          maxLength: 50,
          onChangeText: inputHandler.bind(this, "comments"),
          value: input.comments,
          multiLine: true,
          numberOfLines: 4,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={submitHandler} color="blue">
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
  formContainer: {
    backgroundColor: colors.gray,
    flex: 1,
    padding: 10,
  },

  rowInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: "left",
    textAlign: "center",
    padding: 10,
  },
  buttonsContainer: {
    marginTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  topFormElements: {
    marginTop: 50,
  },
});

export default ManageClientForm;
