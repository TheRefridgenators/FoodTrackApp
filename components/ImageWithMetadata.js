import * as React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Moment from "moment";

// TODO: Consider renaming this to something shorter

/**
 *
 * @param {{metadata: object, imageLink: string, imageStyle: object}} props
 */
export function TouchableImageWithMetadata(props) {
  const { navigate } = useNavigation();

  return (
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
  );
}

function formatTimestamp(dateObj) {
  return dateObj.format("MMMM Do[,] YYYY [at] h:mm A");
}
