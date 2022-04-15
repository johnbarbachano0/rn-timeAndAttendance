import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import Admin from "../screens/adminScreens/Admin";
import BackIcon from "../components/BackIcon";
import AddEdit from "../screens/adminScreens/AddEdit";
import Maintenance from "../screens/adminScreens/Maintenance";

const AdminStackNav = () => {
  const { dark: isDark, colors } = useTheme();
  const AdminStack = createNativeStackNavigator();

  return (
    <AdminStack.Navigator
      initialRouteName="Admin"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: isDark ? colors.card : colors.header,
        },
        headerTintColor: colors.text,
      }}
    >
      <AdminStack.Screen
        name="Admin"
        component={Admin}
        options={({ navigation }) => ({
          title: "Admin",
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
      <AdminStack.Screen
        name="Maintenance"
        component={Maintenance}
        options={({ navigation, route }) => ({
          title: route?.params?.title,
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
      <AdminStack.Screen
        name="AddEdit"
        component={AddEdit}
        options={({ navigation, route }) => ({
          title: route?.params?.title,
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
    </AdminStack.Navigator>
  );
};

export default AdminStackNav;
