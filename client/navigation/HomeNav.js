import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStackNav from "./HomeStackNav";
import TimeLogsStackNav from "./TimeLogsStackNav";
import AdminStackNav from "./AdminStackNav";
import ChangeRequestTabNav from "./ChangeRequestTabNav";
import HistoryStackNav from "./HistoryStackNav";
import ReportsStackNav from "./ReportsStackNav";

const HomeNav = () => {
  const Home = createNativeStackNavigator();

  return (
    <Home.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Home.Screen name="AdminStack" component={AdminStackNav} />
      <Home.Screen name="ChangeRequestStack" component={ChangeRequestTabNav} />
      <Home.Screen name="HistoryStack" component={HistoryStackNav} />
      <Home.Screen name="HomeStack" component={HomeStackNav} />
      <Home.Screen name="ReportsStack" component={ReportsStackNav} />
      <Home.Screen name="TimeLogsStack" component={TimeLogsStackNav} />
    </Home.Navigator>
  );
};

export default HomeNav;
