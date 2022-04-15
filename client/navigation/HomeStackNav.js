import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/homeScreens/Home";
import Map from "../screens/homeScreens/Map";

const HomeStackNav = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Map" component={Map} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNav;
