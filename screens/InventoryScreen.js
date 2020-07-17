import * as React from "react";
import { Image, View, ScrollView, Text } from "react-native";

import firebase, { storage } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import InventoryItem from "../components/InventoryItem";

let count = 0;

export class InventoryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  getUserItems = async () => {
    const currentUser = firebase.auth().currentUser;

    const itemCollection = await firebase
      .firestore()
      .collection(`users/${currentUser.uid}/items`)
      .get();

    let tempItems = [];
    itemCollection.docs.forEach((doc) => {
      const data = doc.data();

      if (doc.id !== "metadata") {
        tempItems.push({ name: doc.id, data });
      }
    });

    this.setState({ items: tempItems });
  };

  componentDidMount = () => {
    this.getUserItems();
  };

  render() {
    const itemComponents = this.state.items.map(documentToInventoryItem);

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
}

export default function InventoryScreenFunc(props) {
  const currentUser = firebase.auth().currentUser;

  const [items, setItems] = React.useState([]);
  const [storageApple, setStorageApple] = React.useState("");
  //const [gotItems, setGotItems] = React.useState(false);

  React.useEffect(() => {
    const getUserItems = async () => {
      const itemCollection = await firebase
        .firestore()
        .collection(`users/${currentUser.uid}/items`)
        .get();

      let tempItems = [];
      itemCollection.docs.forEach((doc) => {
        const data = doc.data();

        if (doc.id !== "metadata") {
          tempItems.push({ name: doc.id, data });
        }
      });

      /*
      if (!gotItems) {
        setItems(tempItems);
        setGotItems(true);
      }
      */
      setItems(tempItems);
    };

    if (currentUser !== null) getUserItems();

    const getImageLink = async () => {
      const imageLinkRef = await firebase
        .storage()
        .ref("foods/apple.jpg")
        .getDownloadURL();

      setStorageApple(imageLinkRef);
    };
    getImageLink();
  }, []);

  const itemComponents = items.map(documentToInventoryItem);

  if (itemComponents.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Text style={styles.noItemsText}>No items yet.</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        {items.map(documentToInventoryItem)}
        <InventoryItem
          imageLink={storageApple}
          itemName="test"
          useClass="single"
        />
      </ScrollView>
    );
  }
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

const styles = {
  noItemsText: {
    fontSize: 20,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
