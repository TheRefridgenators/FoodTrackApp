import * as React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FullWidthButton } from "../components/FullWidthButton";
import Colors from "../constants/Colors";

/**
 * An alert that serves to either notify the user of something or ask something
 * of the user (clarification of item, etc.).
 * @param {{purpose: "notify" | "ask", imageLink: string, summary: string}} props The
 * options related to the type of alert and its contents, such as whether it
 * includes an image or the alert's purpose.
 * Leave `imageLink` uninitialized if no image is required.
 *
 * TODO: Name this better to encompass the "ask" purpose as well.
 * TODO: Find a better way to document `props`.
 */
export function TypedAlert(props) {
  return (
    <View style={styles.alertContainer}>
      {props.imageLink && (
        <Image source={{ uri: props.imageLink }} style={styles.alertImage} />
      )}
      <Text style={{ flex: 4, textAlign: "center" }}>{props.summary}</Text>
      {props.purpose === "ask" && feedbackBoxes(null, null)}
    </View>
  );
}

function feedbackBoxes(onYes, onNo) {
  return (
    <View style={styles.feedbackContainer}>
      <TouchableOpacity style={{ marginHorizontal: 5 }}>
        <Ionicons name="md-checkmark" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 5 }}>
        <Ionicons name="md-close" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderTopColor: "gray",
    borderTopWidth: 2,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  feedbackContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ccc",
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  alertImage: {
    flex: 2,
    height: 100,
    resizeMode: "contain",
  },
});
