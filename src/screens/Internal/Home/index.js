import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { TrashMeLater } from "./TrashMeLater";

export const Home = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingHorizontal: 5,
          paddingTop: 15,
          backgroundColor: "#181A1F",
          position: "absolute",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Budget"
        component={TrashMeLater}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="money-bill-wave" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions "
        component={TrashMeLater}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list-alt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={TrashMeLater}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
