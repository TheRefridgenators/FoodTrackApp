import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { ItemInfoScreen } from "./screens/ItemInfoScreen";
import { ImageViewScreen } from "./screens/ImageViewScreen";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
