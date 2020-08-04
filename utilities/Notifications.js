import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  Platform
} from "react-native";

/**
 * Checks for permissions and requests them if necessary.
 * Note that this depends on the user being authenticated via Firebase Auth.
 */
export async function registerForNotificationsAsync() {
  if (Constants.isDevice) {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser === null) return;

      const currentPerms = await Notifications.getPermissionsAsync();

      if (!permsGranted(currentPerms)) {
        const newPerms = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
          },
        });

        if (!permsGranted(newPerms)) return;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
          enableVibrate: true,
        })
      }

      const devicePushToken = await Notifications.getExpoPushTokenAsync();

      const userData = await firebase.firestore().doc(`users/${currentUser.uid}`).get();

      const pushTokens = userData.get("pushTokens");

      let updatedPushTokens = pushTokens ?? [];
      if (!updatedPushTokens.includes(devicePushToken)) {
        updatedPushTokens = updatedPushTokens.concat(devicePushToken.data)
      }

      await firebase.firestore().doc(`users/${currentUser.uid}`).update({
        pushTokens: updatedPushTokens
      });
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * Checks if permissions are granted for notifications.
 * @param {import("expo-notifications/build/NotificationPermissions.types").NotificationPermissionsStatus} permStatus
 */
function permsGranted(permStatus) {
  return (
    permStatus.granted ||
    permStatus.ios.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}