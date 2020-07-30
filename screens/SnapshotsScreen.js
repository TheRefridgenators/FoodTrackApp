import * as React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import Moment from "moment";

import firebase from "firebase/app";

import ImageGrid from "../components/ImageGrid";
import { formatTimestamp } from "../utilities/Metadata";

export function SnapshotsScreen() {
  const [snapshots, setSnapshots] = React.useState([]);

  React.useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    const getSnapshots = async () => {
      const userSnapshotColl = await firebase
        .firestore()
        .collection(`users/${currentUser.uid}/snapshots`)
        .get();

      const userSnapshots = userSnapshotColl.docs.filter(
        (doc) => doc.id !== "metadata"
      );

      const formattedSnapshots = await Promise.all(
        userSnapshots.map(async (doc) => {
          const { filename, timestamp: rawTimestamp } = doc.data();

          const imageLink = await firebase
            .storage()
            .ref(`snapshots/${currentUser.uid}/${filename}`)
            .getDownloadURL();

          return [
            imageLink,
            {
              timestamp: formatTimestamp(Moment(rawTimestamp.toDate())),
            },
          ];
        })
      );

      const sortedSnapshots = formattedSnapshots.sort(
        (snap1, snap2) => snap2[1].timestamp - snap1[1].timestamp
      ); // Sorted in descending date order

      setSnapshots(sortedSnapshots);
    };

    if (currentUser) getSnapshots();
  }, []);

  return snapshots.length > 0 ? (
    <ScrollView style={styles.gridContainer}>
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
