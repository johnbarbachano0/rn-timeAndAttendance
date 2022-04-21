import React, { useState, useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { setHistoryData } from "../../features/HistorySlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetHistoryQuery } from "../../services/HistoryService";
import { useHistory } from "../../helpers/useHistory";
import CustomTable from "../../components/CustomTable";

const History = ({ navigation, route }) => {
  //Hooks and constants
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { id: uid } = useSelector((state) => state.auth.authData);
  const history = useSelector((state) => state.history.historyData);
  const { historyHeaders, data } = useHistory();

  const {
    data: historyData,
    isLoading: loadHistory,
    refetch: refetchHistory,
    error: errHistory,
  } = useGetHistoryQuery({
    uid: uid,
    query: "",
  });

  // functions
  const handleNav = (dataVal) => {
    navigation.navigate("ViewHistory", {
      data: dataVal,
    });
  };

  //Listeners
  useEffect(() => {
    isError &&
      createAlert(
        "oneButton",
        "Error!",
        "Error encountered.",
        { one: "Try again!" },
        () => refetchHistory()
      );
  }, [isError]);

  useEffect(() => {
    data?.type && handleNav(data);
  }, [data]);

  useEffect(() => {
    historyData && dispatch(setHistoryData(historyData));
  }, [historyData]);

  useEffect(() => {
    setLoading(loadHistory);
  }, [loadHistory]);

  useEffect(() => {
    setError(errHistory);
  }, [errHistory]);

  //Backhandler
  const handleBack = () => navigation.goBack();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.screen}>
      <CustomTable
        rows={history || []}
        headers={historyHeaders}
        loading={isLoading}
      />
    </View>
  );
};

export default History;

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
    bottom: 80,
  },
});
