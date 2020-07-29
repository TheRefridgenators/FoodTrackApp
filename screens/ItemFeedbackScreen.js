import * as React from "react";
import { Image, View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useNavigation } from "@react-navigation/native";
//import MultipleChoice from "react-native-multiple-choice-picker";
import { MultipleChoice } from "../components/MultipleChoice";

import Layout from "../constants/Layout";

export function ItemFeedbackScreen(props) {
  const { navigate } = useNavigation();
  const { imageLink } = props.route.params;
  console.log("imageLink :>> ", imageLink);

  const [itemName, setItemName] = React.useState("");
  const [useClass, setUseClass] = React.useState("");
  const [badInput, setBadInput] = React.useState(false);

  const inputBorderStyle = badInput
    ? styles.badInputBorder
    : styles.defaultInputBorder;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageLink }} style={styles.itemImage} />
      <Text>What is this item called?</Text>
      <TextInput
        value={itemName}
        onChangeText={setItemName}
        style={[styles.defaultInputStyle, inputBorderStyle]}
      />
      <Text>How many times can it be used? (Once/Multiple times)</Text>
      <TextInput
        value={useClass}
        onChangeText={setUseClass}
        style={[styles.defaultInputStyle, inputBorderStyle]}
      />
      <Button
        title="Submit"
        onPress={async () => {
          if (!inputsValid(itemName, useClass)) {
            console.log("Inputs not valid");
            setBadInput(true);
            return;
          } else {
            setBadInput(false);
          }
        }}
      />
    </View>
  );
}

function inputsValid(itemName, useClass) {
  return itemName.length > 0 && useClass.match(/^(once|multiple)( times)?/i);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  itemImage: {
    height: Layout.window.height / 2,
    width: Layout.window.width - 20,
    resizeMode: "contain",
    marginVertical: 10,
  },
  itemNameInput: {
    width: Layout.window.width,
  },
  useClassPicker: {
    flex: 1,
    height: 10,
    width: Layout.window.width,
  },
  badInputBorder: {
    borderColor: "red",
  },
  defaultInputBorder: {
    borderColor: "black",
  },
  defaultInputStyle: {
    borderWidth: 2,
    width: Layout.window.width - 20,
    height: 30,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "white",
  },
});
