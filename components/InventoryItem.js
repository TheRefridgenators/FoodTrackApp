import * as React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Props:
// imageLink - link (uri) to image
// itemData - object containing first seen date, classification, etc.
export default function InventoryItem(props) {
  const { navigate, push } = useNavigation();

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => push("ItemInfo", { test: "hi", itemName: props.itemName})}>
      <Image source={{ uri: props.imageLink }} style={styles.itemImage} />
      <View style={styles.infoContainer}>
        <Text>Here's {useProperArticle(props.itemName)}!</Text>
        <Text>Here's some "information"</Text>
      </View>
      <Ionicons name="md-arrow-dropright" size={30} style={{marginRight: 10}}/>
    </TouchableOpacity>
  )
}

function useProperArticle(itemName) {
  return (itemName.match(/^[aeiou]/i) ? "an " : "a ") + itemName;
}

const styles = {
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginBottom: -2,
    alignItems: "center",
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