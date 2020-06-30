import * as React from "react";
import { View, Text } from "react-native";

import { TypedAlert } from "../components/TypedAlert";

// TODO: Consider getting to this in the top bar (small icon) rather than the
// bottom (I do want three icons in the bottom bar, however)
export function AlertsScreen(props) {
  return (
    <View style={styles.screenContainer}>
      <Text>This is the alerts screen.</Text>
      <TypedAlert purpose="ask" summary="Test"/>
      <View></View>
    </View>
  )
}

const styles = {
  screenContainer: {

  }
};