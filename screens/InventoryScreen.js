import * as React from "react";
import { Image, View, ScrollView, Text } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";

import InventoryItem from "../components/InventoryItem";

let count = 0;

export default function InventoryScreen(props) {
  const currentUser = firebase.auth().currentUser;
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    if (__DEV__) setItems([]);

    const getUserItems = async () => {
      const itemCollection = await firebase
        .firestore()
        .collection(`users/${currentUser.uid}/items`)
        .get();

      itemCollection.docs.forEach((doc) => {
        const data = doc.data();

        if (doc.id !== "metadata") {
          setItems((list) => list.concat({ name: doc.id, data }));
        }
      });
    };

    if (currentUser !== null) getUserItems();
  });

  return (
    <ScrollView>
      <View>{items.map(documentToInventoryItem)}</View>
    </ScrollView>
  );
}

function documentToInventoryItem(document) {
  return (
    <InventoryItem
      itemName={document.name}
      imageLink={document.data.imageLink}
      useClass={document.data.useClass}
      key={count++}
    />
  );
}

const styles = {};
