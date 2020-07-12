import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

// Firebase for data storage/authentication
import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./config";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { ItemInfoScreen } from "./screens/ItemInfoScreen";
import { ImageViewScreen } from "./screens/ImageViewScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { LoadingScreen } from "./screens/LoadingScreen";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Add user to firestore if they're not there already, otherwise update

export default function App() {
  const [hasLoggedIn, setLoggedIn] = React.useState(false);
  const [hasLoaded, setLoaded] = React.useState(false);

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      {!hasLoaded && (
        <LoadingScreen
          onLoad={() => setLoaded(true)}
          onLogin={() => setLoggedIn(true)}
        />
      )}
      {!hasLoggedIn && hasLoaded && (
        <LoginScreen
          onLogin={() => {
            setLoggedIn(true);
            setLoaded(false);
          }}
        />
      )}
      {hasLoggedIn && hasLoaded && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
              name="ItemInfo"
              component={ItemInfoScreen}
              options={({ route }) => ({
                headerTitle: route.params.itemName,
              })}
            />
            <Stack.Screen
              name="ImageView"
              component={ImageViewScreen}
              options={({ route }) => ({
                headerTitle: route.params.timestamp,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
