import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Moment from "moment";

import ImageGrid from "../components/ImageGrid";
import { formatTimestamp } from "../utilities/Metadata";

export function SnapshotsScreen() {
  return (
    <View style={[styles.container, styles.screenCenter]}>
      <ImageGrid
        images={Array(5).fill([
          "http://192.168.1.55:3000/images/Apple.jpg",
          {
            apple: true,
            timestamp: formatTimestamp(Moment()),
          },
        ])}
        maxWidth={3}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
};
