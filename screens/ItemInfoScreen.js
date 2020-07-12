import * as React from "react";
import { View, Text, Image } from "react-native";

import { FullWidthButton } from "../components/FullWidthButton";
import Layout from "../constants/Layout";

const contents = (
  <View>
    <Text>Hello!</Text>
  </View>
);

export function ItemInfoScreen(props) {
  const { test, imageLink, itemInfo } = props.route.params;

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Image source={{ uri: imageLink }} style={styles.itemImage} />
      <View style={styles.dataContainer}>
        <Text>
          This is the item info screen. Supplied parameter:
          {" " + props.route.params.test}
        </Text>
      </View>
    </View>
  );
}

const styles = {
  dataContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  itemImage: {
    marginVertical: 10,
    height: Layout.window.height / 2 - 10,
    resizeMode: "contain",
  },
};
