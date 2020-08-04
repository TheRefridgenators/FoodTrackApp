import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

// Logging in/database access
import * as firebase from "firebase/app";
import {} from "firebase/auth";

import { logInAsync } from "expo-google-app-auth";
import { firebaseLoginConfig } from "../config";

export function LoginScreen(props) {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.topTextContainer}>
        <Text style={{ fontSize: 30 }}>Login to FoodTrack</Text>
      </View>
      <View style={styles.serviceButtonContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => logInUser(props.onLogin)}
        >
          <Text style={{ color: "white", marginHorizontal: 5 }}>
            With Google
          </Text>
          <Ionicons name="logo-google" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

async function logInUser(onLogin) {
  try {
    const { type, accessToken, user, idToken } = await logInAsync(
      firebaseLoginConfig
    );

    if (type === "success") {
      let provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = provider.credential(idToken, accessToken);

      // Log in user
      await firebase.auth().signInWithCredential(userCredential);
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const registeredUsers = await firebase
          .firestore()
          .collection("users")
          .get();

        if (registeredUsers.docs.every((doc) => doc.id !== currentUser.uid)) {
          const now = new Date();
          await firebase.firestore().doc(`users/${currentUser.uid}`).set({
            createdAt: now,
            lastLoggedIn: now,
            email: user.email,
          });
        }

        onLogin();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topTextContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceButtonContainer: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "orange",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
});
