import * as React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FullWidthButton } from "./FullWidthButton";

// Props:
// imageLink - link (uri) to image
// itemData - object containing first seen date, classification, etc.
export default function InventoryItem(props) {
  const { navigate, push } = useNavigation();

  const itemContents = (
    <View style={{flexDirection: "row"}}>
      <Image source={{ uri: props.imageLink }} style={styles.itemImage} />
      <View style={styles.infoContainer}>
        <Text>Here's {useProperArticle(props.itemName)}</Text>
        <Text>Here's some "information."</Text>
      </View>
    </View>
  );
  return (
    <FullWidthButton contents={itemContents} useArrow={true} onPress={() => push("ItemInfo", { test: "hi", itemName: props.itemName })} />
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