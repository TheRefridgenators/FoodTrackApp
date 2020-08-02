import * as React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import InventoryItem from "../components/InventoryItem";
import { registerForNotificationsAsync } from "../utilities/Notifications";
import { itemFilenameToLink } from "../utilities/Images";

export default function InventoryScreen() {
  const currentUser = firebase.auth().currentUser;

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const getUserItems = async () => {
      const userDoc = await firebase
        .firestore()
        .doc(`users/${currentUser.uid}`)
        .get();

      const tempItems = [];

      for (const item of userDoc.data().items) {
        const filename = `${item.label}${item.confidence}.jpg`;
        const imageLink = await itemFilenameToLink(filename);
        console.log("imageLink :>> ", imageLink);

        tempItems.push({
          name: item.label === "null" ? "unknown item" : item.label,
          imageLink,
          useClass: item.usecase,
          itemData: item,
        });
      }

      setItems(tempItems);
    };

    if (currentUser) getUserItems();
  }, []);

  React.useEffect(() => {
    registerForNotificationsAsync();
  }, []);

  const itemComponents = items.map(documentToInventoryItem);

  if (itemComponents.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Text style={styles.noItemsText}>No items yet.</Text>
      </View>
    );
  } else {
    return <ScrollView>{itemComponents}</ScrollView>;
  }
}

let count = 0;

function documentToInventoryItem(document) {
  let useClass = "";

  switch (document.useClass) {
    case "single":
      useClass = "one";
      break;

    default:
      useClass = document.useClass;
      break;
  }

  return (
    <InventoryItem
      itemName={document.name}
      imageLink={document.imageLink}
      useClass={useClass}
      itemData={document.itemData}
      key={count++}
    />
  );
}

const styles = StyleSheet.create({
  noItemsText: {
    fontSize: 20,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
