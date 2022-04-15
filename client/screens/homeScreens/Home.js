import React, { useState, useEffect } from "react";
import { createAlert } from "../../components/Alert";
import { isApple } from "../../constants/isApple";
import { isDisplay } from "../../components/misc";
import { Image, StyleSheet, View } from "react-native";
import { setAuthData } from "../../features/AuthSlice";
import { setLogsData } from "../../features/LogsSlice";
import { setAccessData } from "../../features/MaintenanceSlice";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useGetLogsQuery } from "../../services/LogService";
import CustomAppbar from "../../components/CustomAppbar";
import Loading from "../../components/Loading";
import LogButton from "../../components/LogButton";
import logo from "../../assets/therobotcompany.png";
import ModulesList from "../../components/ModulesList";
import UserInfo from "../../components/UserInfo";

export const typeData = [
  {
    type: 0,
    label: "Confirm?",
    color: "#d2d2d2",
    icon: "help-box",
  },
  {
    type: 1,
    label: "Time In",
    color: "#5BAB5A",
    icon: "login-variant",
  },
  {
    type: 2,
    label: "Time Out",
    color: "#FFC24C",
    icon: "login-variant",
  },
  {
    type: 3,
    label: "Completed",
    color: "#207178",
    icon: "checkbox-marked-outline",
  },
];

const Home = ({ navigation }) => {
  // Hooks & Constants
  const [workStatusId, setWorkStatusId] = useState(1);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { modules, workStatus, permissionRoleTags } = useSelector(
    (state) => state.maintenance.maintenanceData
  );
  const { accessData } = useSelector((state) => state.maintenance);

  const { todayLogs, prevDay, prevDayLogs } = useSelector(
    (state) => state.logs
  );

  const [access, setAccess] = useState([]);

  const {
    data: logsData,
    isLoading,
    error,
    refetch,
  } = useGetLogsQuery({
    uid: user.id,
    query: "",
    filter: "",
  });

  const workStatusDesc = workStatus
    ?.filter((item) => item?.id === workStatusId)
    ?.pop()?.title;

  const buttonData = typeData
    ?.filter((item) => item?.type === workStatusId)
    ?.pop();

  // Timelogtype listener
  useEffect(() => {
    const prevWorkId = [...todayLogs]?.shift()?.TimeLogTypeId;
    var workId = todayLogs?.length === 2 ? 3 : prevWorkId === 1 ? 2 : 1;
    setWorkStatusId(workId);
  }, [todayLogs]);

  //Previous logs check
  useEffect(() => {
    isFocused &&
      prevDayLogs?.length !== 2 &&
      prevDay &&
      createAlert(
        "oneButton",
        "Incomplete Logs!",
        `No timeout for ${prevDay}, please file a change request.`,
        { one: "OK" },
        () => {}
      );
  }, [prevDay]);

  //TimeLog Data Listener
  useEffect(() => {
    dispatch(setLogsData({ allLogs: logsData || [], uid: user.id }));
  }, [logsData]);

  // Screen is Focused listener
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });
    return unsubscribe;
  }, [isFocused]);

  //Loading Listener
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    error &&
      createAlert(
        "oneButton",
        "Error!",
        "Error in getting change requests.",
        { one: "Try again" },
        () => refetch()
      );
  }, [error]);

  useEffect(() => {
    const newVal = permissionRoleTags
      ?.filter(
        ({ RoleId, PermissionId: id, status }) =>
          RoleId === user?.RoleId && status === true
      )
      .map(({ PermissionId }) => PermissionId);
    setAccess(newVal);
  }, [user, permissionRoleTags]);

  useEffect(() => {
    dispatch(setAccessData(access));
  }, [access]);

  // Functions
  const handleConfirm = () =>
    createAlert(
      "twoButton",
      "Confirm logout?",
      { one: "Yes", two: "No" },
      "Are you sure you want to logout?",
      handleLogout,
      () => {}
    );

  const handleLogout = () => dispatch(setAuthData(false));

  const handleNext = () =>
    navigation.navigate("Map", {
      type: workStatusId,
      time: new Date().toISOString(),
    });

  const handleDisplay = (id) => !isDisplay(id, accessData);

  //returns
  if (error || loading) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <CustomAppbar>
        <Image style={styles.logo} source={logo} />
      </CustomAppbar>
      <View style={[styles.container, isApple && styles.iosCont]}>
        <UserInfo
          user={user}
          workId={workStatusId}
          workStatusDesc={workStatusDesc}
          logs={todayLogs}
        />
        <ModulesList
          modules={modules}
          onLogout={handleConfirm}
          navigation={navigation}
          style={{ justifyContent: "center", alignItems: "center" }}
          accessData={accessData}
        />
      </View>
      <LogButton
        type={user?.WorkStatusId}
        onLog={workStatusId !== 3 && handleNext}
        loading={loading}
        button={buttonData}
        style={[styles.log, handleDisplay(6) && { display: "none" }]}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: "100%",
  },
  iosCont: {
    marginTop: 90,
  },
  log: {
    position: "absolute",
    bottom: 0,
  },
  logo: {
    height: 50,
    width: 200,
  },
});
