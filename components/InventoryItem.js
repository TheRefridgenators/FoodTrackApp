import * as React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import { useProperArticle } from "../utilities/Inventory";

// Props:
// imageLink - link (uri) to image
// itemData - object containing first seen date, classification, etc.

/**
 * Represents an item within the refrigerator with some metadata attached.
 * @param {{imageLink: string, itemName: string}} props A link to the item image
 * and the name of the item, respectively.
 */
export default function InventoryItem(props) {
  const { navigate } = useNavigation();
  const [itemName, setItemName] = React.useState(props.itemName);
  const [useClass, setUseClass] = React.useState(props.useClass);

  React.useEffect(() => {
    const applyOverrides = async () => {
      const userUid = firebase.auth().currentUser.uid;
      const userOverrides = await firebase
        .firestore()
        .collection(`users/${userUid}/overrides`)
        .get();

      const matchingOverrides = userOverrides.docs.filter((override) => {
        const { confidence, area } = override.data();
        return (
          inSymmetricalRangeInclusive(
            confidence,
            0.01,
            props.itemData.confidence
          ) && inSymmetricalRangeInclusive(area, 1000, props.itemData.area)
        );
      });

      if (matchingOverrides.length) {
        // TODO: Implement method to determine best override
        const bestOverride = matchingOverrides[0];

        setItemName(bestOverride.get("label"));
        setUseClass(bestOverride.get("useClass"));
      }
    };

    applyOverrides();
  }, [props.itemName, props.useClass]);

  return (
    <TouchableOpacity
      style={styles.contentContainer}
      onPress={() => {
        navigate("ItemIdent", {
          imageLink: props.imageLink,
          itemData: props.itemData,
          defaultName: props.itemName,
          defaultUseClass: props.useClass,
        });
      }}
    >
      <Image
        source={{ uri: props.imageLink || "unavailable" }}
        style={styles.itemImage}
      />
      <View style={styles.infoContainer}>
        <Text>Item: {itemName}</Text>
        <Text>Uses: {useClass}</Text>
      </View>
    </TouchableOpacity>
  );
}

function inSymmetricalRangeInclusive(median, margin, value) {
  return median - margin <= value && value <= median + margin;
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "black",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginBottom: -2,
  },
  itemImage: {
    flex: 2,
    height: 100,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
