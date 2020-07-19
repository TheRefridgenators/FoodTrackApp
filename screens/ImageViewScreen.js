import * as React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { stringifyMetadata } from "../utilities/Metadata";

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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
  },
  imageStyle: {
    height: Layout.window.height / 2,
    resizeMode: "contain",
    marginVertical: 10,
  },
  displayDataContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});
