import * as React from "react";
import { View, StyleSheet } from "react-native";
import Moment from "moment";

import firebase from "firebase/app";

import ImageGrid from "../components/ImageGrid";
import { formatTimestamp } from "../utilities/Metadata";
import { ScrollView } from "react-native-gesture-handler";

export function SnapshotsScreen() {
  const [snapshots, setSnapshots] = React.useState([]);

  React.useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    const getSnapshots = async () => {
      const userSnapshots = await firebase
        .firestore()
        .collection(`users/${currentUser.uid}/snapshots`)
        .get();

      const formattedSnapshots = userSnapshots.docs
        .filter((doc) => doc.id !== "metadata")
        .map((doc) => {
          const { imageLink, timestamp: rawTimestamp } = doc.data();
          return [
            imageLink,
            {
              timestamp: formatTimestamp(Moment(rawTimestamp.toDate())),
            },
          ];
        })
        .sort((snap1, snap2) => snap2[1].timestamp - snap1[1].timestamp); // Sorted in descending order

      setSnapshots(formattedSnapshots);
    };

    if (currentUser) getSnapshots();
  }, []);

  return snapshots.length > 0 ? (
    <ScrollView style={styles.container}>
      <ImageGrid images={snapshots} maxWidth={3} />
    </ScrollView>
  ) : (
    <View style={[styles.gridContainer, styles.missingTextContainer]}>
      <Text>No snapshots yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
  },
  missingTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
