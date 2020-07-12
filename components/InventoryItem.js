import * as React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FullWidthButton } from "./FullWidthButton";

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
    <FullWidthButton
      contents={itemContents}
      useArrow={true}
      onPress={() =>
        navigate("ItemInfo", {
          test: "hi",
          itemName: props.itemName,
          imageLink: props.imageLink,
        })
      }
    />
  );
}

function useProperArticle(itemName) {
  return (itemName.match(/^[aeiou]/i) ? "an " : "a ") + itemName;
}

const styles = {
  contentContainer: {
    flexDirection: "row",
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
