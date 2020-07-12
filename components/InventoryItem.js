import * as React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FullWidthButton } from "./FullWidthButton";
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

  const itemContents = (
    <View style={{ flexDirection: "row" }}>
      <Image source={{ uri: props.imageLink }} style={styles.itemImage} />
      <View style={styles.infoContainer}>
        <Text>Here's {useProperArticle(props.itemName)}!</Text>
        <Text>Here's some "information."</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.contentContainer}>
      <Image source={{ uri: props.imageLink }} style={styles.itemImage} />
      <View style={styles.infoContainer}>
        <Text>Here's {useProperArticle(props.itemName)}!</Text>
        <Text>Here's some "information."</Text>
      </View>
    </View>
  );
}

const styles = {
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
};
