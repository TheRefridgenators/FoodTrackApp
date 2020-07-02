import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";

import { SnapshotsScreen } from "../screens/SnapshotsScreen";
import InventoryScreen from "../screens/InventoryScreen";
import { AlertsScreen } from "../screens/AlertsScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Inventory";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Snapshots"
        component={SnapshotsScreen}
        options={{
          title: "Snapshots",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-images" />
          ), // TODO: This could also be a camera
        }}
      />
      <BottomTab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          title: "Inventory",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-list-box" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          title: "Alerts",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-journal" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Image":
      return "Refrigerator Snapshots";
    case "Inventory":
      return "Fridge Items";
    case "Alerts":
      return "Alerts";
  }
}
