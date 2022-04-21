import React, { useState, useEffect } from "react";
import { createAlert } from "../../components/Alert";
import { isApple } from "../../constants/isApple";
import { isDisplay } from "../../components/misc";
import { BackHandler, Image, StyleSheet, View } from "react-native";
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
import { typeData } from "../../helpers/DataType";

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

  //Backhandler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleConfirm
    );
    return () => backHandler.remove();
  }, []);

  // Functions
  const handleConfirm = () =>
    createAlert(
      "twoButton",
      "Confirm logout?",
      "Are you sure you want to logout?",
      { one: "Yes", two: "No" },
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
    width: "100%",
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
