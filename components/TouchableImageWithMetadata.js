import * as React from "react";
import { Image, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
            timestamp: formatTimestamp(Moment()),
          })
        }
      >
        <Image source={{ uri: props.imageLink }} style={props.imageStyle} />
      </TouchableOpacity>
      {props.showTimestamp && (
        <Text>{props.metadata.timestamp.format("M/DD [at] h:mm A")}</Text>
      )}
    </View>
  );
}

function formatTimestamp(dateObj) {
  return dateObj.format("MMMM Do[,] YYYY [at] h:mm A");
}

const styles = {
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  timestampText: {
    marginTop: 5,
  },
};
