import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import ImageGrid from "../components/ImageGrid";

export function SnapshotsScreen() {
  return (
    <View style={[styles.container, styles.screenCenter]}>
      <Text style={styles.screenCenter}>
        Here are some apples for your troubles:
      </Text>
      <ImageGrid
        images={Array(5).fill([
          "http://192.168.1.55:3000/images/Apple.jpg",
          {
            apple: true,
          },
        ])}
        maxWidth={3}
      />
    </View>
  );
}

const appleImgScale = 0.5;

const styles = {
  container: {
    flex: 1,
  },
  screenCenter: {
    display: "flex",
    alignItems: "center",
  },
  appleImg: {
    width: 474 * appleImgScale,
    height: 537 * appleImgScale,
  },
};
