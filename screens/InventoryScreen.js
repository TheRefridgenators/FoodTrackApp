import * as React from "react";
import { Image, View, ScrollView, Text } from "react-native";
import InventoryItem from "../components/InventoryItem";
import { ItemInfo } from "./ItemInfoScreen";

export default function InventoryScreen(props) {
  return (
    <View>
      <InventoryItem
        imageLink="http://192.168.1.55:3000/images/Apple.jpg"
        itemName="Apple"
      />
      <InventoryItem
        itemName="Banana"
        imageLink="http://192.168.1.55:3000/images/Banana.jpg"
        fullButton={true}
      />
    </View>
  );
}

const styles = {};
