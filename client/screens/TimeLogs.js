import React, { useState, useEffect } from "react";
import { FAB, Surface, Title } from "react-native-paper";
import { BackHandler, StyleSheet, View } from "react-native";
import { setLogsData } from "../features/LogsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetLogsQuery } from "../services/LogService";
import { useTimelog } from "../helpers/useTimelog";
import CustomTable from "../components/CustomTable";
import MonthYearPicker from "../components/MonthYearPicker";

const TimeLogs = () => {
  //Hooks & Constants
  const dispatch = useDispatch();
  const { id: uid } = useSelector((state) => state.auth.authData);
  const { myLogs } = useSelector((state) => state.logs);
  const [currDate, setCurrDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [monthLogs, setMonthLogs] = useState();
  const date = {
    month: currDate.getMonth(),
    monthName: currDate.toLocaleString("default", { month: "long" }),
    year: currDate.getFullYear(),
  };
  const { timelogHeaders } = useTimelog();

  const {
    data: logsData,
    isLoading,
    refetch,
  } = useGetLogsQuery({
    uid: uid,
    query: "",
    filter: currDate,
  });

  //Listeners
  useEffect(() => {
    logsData && dispatch(setLogsData({ allLogs: logsData, uid }));
  }, [logsData]);

  useEffect(() => {
    currDate && refetch();
  }, [currDate]);

  useEffect(() => {
    myLogs && setMonthLogs(getMonthLogs());
  }, [myLogs]);

  //Backhandler
  const handleBack = () => navigation.goBack();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );
    return () => backHandler.remove();
  }, []);

  //Functions
  const handleFilter = () => setShowDialog(true);

  const handleSelect = (mon, yr) => setCurrDate(new Date(yr, mon));

  const getMonthLogs = () =>
    myLogs?.filter((log) => {
      newdate = new Date(log.date);
      return (
        newdate.getMonth() === date.month && newdate.getFullYear() === date.year
      );
    });

  return (
    <View style={styles.screen}>
      <Surface style={styles.filter}>
        <Title>
          {date.monthName}, {date.year}
        </Title>
      </Surface>

      <CustomTable
        rows={monthLogs || []}
        headers={timelogHeaders}
        loading={isLoading}
        tableStyle={styles.table}
      />

      <FAB
        style={styles.fab}
        small
        icon="filter-variant"
        onPress={handleFilter}
      />

      <MonthYearPicker
        showDialog={showDialog}
        setShowDialog={() => setShowDialog(false)}
        date={date}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default TimeLogs;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  filter: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    left: 40,
    bottom: 50,
  },
  table: { paddingBottom: 100 },
});
