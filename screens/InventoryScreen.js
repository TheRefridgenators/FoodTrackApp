import * as React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import InventoryItem from "../components/InventoryItem";
import { registerForNotificationsAsync } from "../utilities/Notifications";
import { partialItemPathToLink } from "../utilities/Images";

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
        const imageLink = await partialItemPathToLink(item.filename);

        tempItems.push({
          name: item.label,
          imageLink,
          useClass: item.useClass,
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
    return <ScrollView>{items.map(documentToInventoryItem)}</ScrollView>;
  }
}

let count = 0;

function documentToInventoryItem(document) {
  return (
    <InventoryItem
      itemName={document.name}
      imageLink={document.imageLink}
      useClass={document.useClass}
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
