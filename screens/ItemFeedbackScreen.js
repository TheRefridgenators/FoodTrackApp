import * as React from "react";
import { Image, View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import Layout from "../constants/Layout";

export function ItemFeedbackScreen(props) {
  const { navigate } = useNavigation();
  const {
    imageLink,
    itemData,
    alertId,
    defaultName,
    defaultUseClass,
  } = props.route.params;

  const [itemName, setItemName] = React.useState(defaultName || "");
  const [useClass, setUseClass] = React.useState(defaultUseClass || "");
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
            const parsedUseClass = useClass.match(/^once/i)
              ? "single"
              : "multi";
            await writeOverride(itemData, alertId, itemName, parsedUseClass);
            navigate("Root");
          }
        }}
      />
    </View>
  );
}

async function writeOverride(itemData, alertId, itemName, useClass) {
  const userUid = firebase.auth().currentUser.uid;

  const overrideData = {
    label: itemName,
    useClass,
    confidence: itemData.confidence,
    area: itemData.area,
  };

  // Write override
  await firebase
    .firestore()
    .collection(`users/${userUid}/overrides`)
    .doc()
    .set(overrideData);

  // Delete alert in firestore
  if (alertId)
    await firebase
      .firestore()
      .doc(`users/${userUid}/alerts/${alertId}`)
      .delete();
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
