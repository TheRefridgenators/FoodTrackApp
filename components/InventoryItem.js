import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  return (
    <View style={styles.contentContainer}>
      <Image
        source={{ uri: props.imageLink || "unavailable" }}
        style={styles.itemImage}
      />
      <View style={styles.infoContainer}>
        <Text>Here's {useProperArticle(props.itemName)}!</Text>
        <Text>Uses: {props.useClass}</Text>
      </View>
    </View>
  );
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
