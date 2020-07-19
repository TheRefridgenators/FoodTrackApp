import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Returns a button that takes up the full screen width with the specified contents.
 * @param {{useArrow: boolean, contents: JSX.Element, onPress: function}} props
 * The options related to displaying the button.
 * Note: Make sure to wrap `contents` in a `View`.
 */
export function FullWidthButton(props) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
      <View style={styles.contentContainer}>{props.contents}</View>
      {props.useArrow && (
        <Ionicons
          name="md-arrow-dropright"
          size={30}
          style={styles.arrowIcon}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: "gray",
    borderBottomColor: "gray",
    backgroundColor: "white",
    marginBottom: -2,
  },
  contentContainer: {
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    marginHorizontal: 10,
  },
});
