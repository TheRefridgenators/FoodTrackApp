import * as React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Moment from "moment";

import firebase from "firebase/app";
import "firebase/auth";

import { TypedAlert } from "../components/TypedAlert";
import { formatTimestamp } from "../utilities/Metadata";

// TODO: Consider getting to this in the top bar (small icon) rather than the
// bottom (I do want three icons in the bottom bar, however)
export function AlertsScreen() {
  const [userAlerts, setUserAlerts] = React.useState([]);

  React.useEffect(() => {
    const fetchUserAlerts = async () => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const rawUserAlerts = await firebase
          .firestore()
          .collection(`users/${currentUser.uid}/alerts`)
          .get();

        const alertComponents = rawUserAlerts.docs
          .filter((doc) => doc.id !== "metadata")
          .sort(
            (doc1, doc2) =>
              doc2.data().timestamp.toDate() - doc1.data().timestamp.toDate()
          )
          .map(docToAlert);

        setUserAlerts(alertComponents);
      }
    };

    fetchUserAlerts();
  }, []);

  return userAlerts.length > 0 ? (
    <ScrollView style={styles.screenContainer}>{userAlerts}</ScrollView>
  ) : (
    <View>
      <Text style={styles.screenContainer}>No alerts yet.</Text>
    </View>
  );
}

let count = 0;

function docToAlert(alertDoc) {
  const alertData = alertDoc.data();
  console.log("alertData :>> ", alertData);

  return (
    <TypedAlert
      purpose={alertData.purpose}
      summary={alertData.summary}
      imagePath={alertData.itemData?.imagePath}
      itemData={alertData.itemData}
      timestamp={formatTimestamp(Moment(alertData.timestamp.toDate()))}
      alertId={alertDoc.id}
      key={count++}
    />
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
