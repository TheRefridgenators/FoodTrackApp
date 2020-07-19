import * as React from "react";
import { View, StyleSheet } from "react-native";

import { TypedAlert } from "../components/TypedAlert";

// TODO: Consider getting to this in the top bar (small icon) rather than the
// bottom (I do want three icons in the bottom bar, however)
export function AlertsScreen(props) {
  return (
    <View style={styles.screenContainer}>
      <TypedAlert
        purpose="ask"
        summary="Is this an apple?"
        imageLink="http://192.168.1.55:3000/images/Apple.jpg"
      />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
