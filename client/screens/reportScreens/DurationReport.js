import React, { useEffect, useState } from "react";
import { isApple } from "../../constants/isApple";
import { createAlert } from "../../components/Alert";
import { FAB, Surface, Title } from "react-native-paper";
import { setDurationReport } from "../../features/ReportsSlice";
import { BackHandler, StyleSheet, View, Text } from "react-native";
import { useGetDurationReportQuery } from "../../services/ReportService";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import LineReport from "../../components/LineReport";
import MonthYearPicker from "../../components/MonthYearPicker";

const DurationReport = () => {
  //Hooks & Constants
  const { id: uid } = useSelector((state) => state.auth.authData);
  const { durationReport } = useSelector((state) => state.reports);
  const [report, setReport] = useState({ data: [], labels: [] });
  const dispatch = useDispatch();
  const [currDate, setCurrDate] = useState(new Date());
  const {
    data: durationData,
    error: durationError,
    isLoading: durationLoading,
    refetch: durationRefetch,
  } = useGetDurationReportQuery({
    uid,
    query: "",
    filter: currDate,
  });
  const [showDialog, setShowDialog] = useState(false);
  const date = {
    month: currDate.getMonth(),
    monthName: currDate.toLocaleString("default", { month: "long" }),
    year: currDate.getFullYear(),
  };

  //Functions
  const handleFilter = () => setShowDialog(true);

  const handleError = () => {
    durationError && durationRefetch();
  };
  const handleSelect = (mon, yr) => setCurrDate(new Date(yr, mon));
  const setDuration = () => dispatch(setDurationReport(durationData));

  //Listeners
  useEffect(() => {
    durationData && !durationLoading && setDuration();
  }, [durationData]);

  useEffect(() => {
    var data = [],
      labels = [];
    [...durationReport]
      ?.sort((a, b) => (a?.date < b?.date ? -1 : a?.date > b?.date ? 1 : 0))
      ?.map((duration) => {
        const d = new Date(duration?.date);
        labels.push(d.getMonth() + 1 + "/" + d.getDate());
        data.push(duration?.duration);
      });
    setReport({ data, labels });
  }, [durationReport]);

  useEffect(() => {
    durationError &&
      createAlert(
        "oneButton",
        "Error!",
        "Error in getting change requests.",
        { one: "Try again" },
        () => handleError()
      );
  }, [durationError]);

  //Backhandler
  const handleBack = () => navigation.goBack();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );
    return () => backHandler.remove();
  }, []);

  //returns
  if (durationError || durationLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <Surface style={styles.filter}>
        <Title>
          {date.monthName}, {date.year}
        </Title>
      </Surface>
      {report?.data?.length === 0 ? (
        <View style={styles.noreport}>
          <Text>No report data to display!</Text>
        </View>
      ) : (
        <LineReport data={report?.data} labels={report?.labels} />
      )}

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

export default DurationReport;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  noreport: { flex: 1, justifyContent: "center", alignItems: "center" },
  filter: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    left: isApple ? 40 : 20,
    bottom: isApple ? 50 : 30,
  },
});
