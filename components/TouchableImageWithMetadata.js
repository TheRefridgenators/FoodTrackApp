import * as React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Moment from "moment";

// TODO: Consider renaming this to something shorter

/**
 * Represents an image with some associated metadata.
 * @param {{metadata: object, imageLink: string, imageStyle: object,
 * showTimestamp: boolean}} props
 * Metadata to be associated with image, the image source (path or url), and style to apply to image, respectively.
 */
export function TouchableImageWithMetadata(props) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        onPress={() =>
          navigate("ImageView", {
            metadata: props.metadata,
            imageLink: props.imageLink,
            timestamp: props.metadata.timestamp,
          })
        }
      >
        <Image source={{ uri: props.imageLink }} style={props.imageStyle} />
      </TouchableOpacity>
      {props.showTimestamp && (
        <Text style={styles.timestampText}>{props.metadata.timestamp}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  timestampText: {
    fontSize: 12,
  },
});
