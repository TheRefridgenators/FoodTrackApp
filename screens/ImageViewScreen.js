import * as React from "react";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Layout from "../constants/Layout";

/**
 * Represents a screen that is used to view images, such as those from fridge
 * snapshots or items in its inventory.
 * @param {*} props Properties related to screen rendering.
 */
export function ImageViewScreen(props) {
  const { imageLink, metadata } = props.route.params;

  return (
    <View style={styles.screenContainer}>
      {imageLink && (
        <Image source={{ uri: imageLink }} style={styles.imageStyle} />
      )}
      <View style={styles.displayDataContainer}>
        <Text>Here's your data: </Text>
        {Object.entries(metadata).map(stringifyMetadata)}
      </View>
    </View>
  );
}

let id = 0;

function stringifyMetadata([key, value]) {
  return (
    <Text key={id++}>
      <Text style={{ fontWeight: "bold" }}>{key.toString()}: </Text>
      {value.toString()}
    </Text>
  );
}

const styles = {
  screenContainer: {
    flex: 1,
    flexDirection: "column",
  },
  imageStyle: {
    height: Layout.window.height / 2,
    resizeMode: "contain",
  },
  displayDataContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
};
