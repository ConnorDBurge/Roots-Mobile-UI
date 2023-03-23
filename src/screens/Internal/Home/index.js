import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import React from "react";

import { SettingsStack } from "./Settings";
import { TrashMeLater } from "./TrashMeLater";

export const Home = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 5,
          paddingTop: 5,
          backgroundColor: "#181A1F",
          opacity: 0.9,
          position: "absolute",
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Budget"
        component={TrashMeLater}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="money-bill-wave" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TrashMeLater}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list-alt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
