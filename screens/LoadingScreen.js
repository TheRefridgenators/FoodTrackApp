import * as React from "react";
import { Text, View, ActivityIndicator } from "react-native";

import firebase from "firebase/app";

export class LoadingScreen extends React.Component {
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in");
        firebase.firestore().collection("users").doc(user.uid).set({
          lastLoggedIn: Date.now(),
          email: user.email,
        });

        firebase
          .firestore()
          .collection(`users/${user.uid}/items`)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              firebase
                .firestore()
                .doc(`users/${user.uid}/items/metadata`)
                .set({ initialized: true });
            }
          });

        this.props.onLogin();
      } else {
        console.log("User not logged in");
      }

      this.props.onLoad();
    });
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

const styles = {
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
};
