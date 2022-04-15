import React, { useEffect } from "react";
import { capitalize } from "../../components/misc";
import { createAlert } from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setMaintenanceData } from "../../features/MaintenanceSlice";
import { setUsersData } from "../../features/AuthSlice";
import { StyleSheet, View } from "react-native";
import { useGetMaintenanceQuery } from "../../services/MaintenanceService";
import { useGetAllUsersQuery } from "../../services/AuthService";
import Loading from "../../components/Loading";

import MaintenanceList from "../../components/MaintenanceList";

export const menu = [
  { id: 1, title: "Change Request Status", icon: "history" },
  { id: 2, title: "Modules", icon: "view-module" },
  { id: 3, title: "Roles", icon: "account-group" },
  { id: 4, title: "Time Log Types", icon: "math-log" },
  { id: 5, title: "Users", icon: "account-plus" },
  { id: 6, title: "Work Status", icon: "briefcase" },
  { id: 8, title: "Permissions", icon: "view-list" },
  { id: 9, title: "Role-Permission Tagging", icon: "account-details" },
].sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

const Admin = ({ navigation }) => {
  const { authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    data: maintenanceData,
    error: maintenanceError,
    isLoading: maintenanceLoading,
    refetch: mainRefetch,
  } = useGetMaintenanceQuery({
    uid: "",
    query: "",
    type: "",
  });
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useGetAllUsersQuery({
    q: "",
    uid: authData.id,
  });

  const setMaintenance = () => dispatch(setMaintenanceData(maintenanceData));
  const setUsers = () => {
    const newData = userData.map((user) => ({
      ...user,
      fullname: capitalize(user?.firstname) + " " + capitalize(user?.lastname),
    }));
    dispatch(setUsersData(newData));
  };

  const handleError = () => {
    maintenanceError && mainRefetch();
    userError && userRefetch();
  };

  useEffect(() => {
    maintenanceData && !maintenanceLoading && setMaintenance();
  }, [maintenanceData]);

  useEffect(() => {
    userData && !userLoading && setUsers();
  }, [userData]);

  useEffect(() => {
    (userError || maintenanceError) &&
      createAlert(
        "oneButton",
        "Error!",
        "Error in getting change requests.",
        { one: "Try again" },
        () => handleError()
      );
  }, [userError, maintenanceError]);

  if ((userError, maintenanceError, userLoading, maintenanceLoading)) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <MaintenanceList lists={menu} navigation={navigation} />
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
