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
    <ScrollView style={styles.screenContainer}>
      {userAlerts}
      <TypedAlert
        purpose="ask"
        summary="Ask alert test"
        imageLink="https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        timestamp="7/22/20 at 7:30 AM"
      />
    </ScrollView>
  ) : (
    <View>
      <Text style={styles.screenContainer}>No alerts yet.</Text>
    </View>
  );
}

let count = 0;

function docToAlert(alertDoc) {
  const alertData = alertDoc.data();

  return (
    <TypedAlert
      purpose="notify"
      summary={alertData.summary}
      {...(alertData.imagePath && { imagePath: alertData.imagePath })}
      timestamp={formatTimestamp(Moment(alertData.timestamp.toDate()))}
      key={count++}
    />
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
