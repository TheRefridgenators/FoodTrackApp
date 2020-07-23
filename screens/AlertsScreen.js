import * as React from "react";
import { View, StyleSheet } from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

import { TypedAlert } from "../components/TypedAlert";

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
          .sort((doc1, doc2) => doc2.data.timestamp - doc1.data.timestamp)
          .map(docToAlert);

        setUserAlerts(alertComponents);
      }
    };

    fetchUserAlerts();
  }, []);

  return <View style={styles.screenContainer}>{userAlerts}</View>;
}

let count = 0;

function docToAlert({ data: alertData }) {
  return (
    <TypedAlert purpose="notify" summary={alertData.summary} key={count++} />
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
