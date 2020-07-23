import * as React from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

export class LoadingScreen extends React.Component {
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in");

        try {
          firebase.firestore().collection("users").doc(user.uid).update({
            lastLoggedIn: new Date(),
          });
        } catch (error) {
          console.log("Unable to update user: ", error);
        }

        // Initialize collections for current items/past snapshots
        this.initializeNewCollection(user.uid, "items");
        this.initializeNewCollection(user.uid, "snapshots");
        this.initializeNewCollection(user.uid, "alerts");

        this.props.onLogin();
      } else {
        console.log("User not logged in");
      }

      this.props.onLoad();
    });
  };

  initializeNewCollection = (userUid, collectionName) => {
    const collectionPath = `users/${userUid}/${collectionName}`;

    try {
      firebase
        .firestore()
        .collection(collectionPath)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            firebase
              .firestore()
              .collection(collectionPath)
              .doc("metadata")
              .set({ initialized: true });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.checkIfLoggedIn();
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginVertical: 10,
    fontSize: 30,
  },
});
