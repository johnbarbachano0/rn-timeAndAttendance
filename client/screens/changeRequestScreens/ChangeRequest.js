import React, { useEffect, useState } from "react";
import { isApple } from "../../constants/isApple";
import { capitalize, isDisplay } from "../../components/misc";
import { createAlert } from "../../components/Alert";
import { FAB } from "react-native-paper";
import { setChangeRequestsData } from "../../features/ChangeRequestSlice";
import { BackHandler, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetChangeRequestQuery } from "../../services/ChangeRequestService";
import { useChangeRequest } from "../../helpers/useChangeRequest";
import CustomTable from "../../components/CustomTable";
import Loading from "../../components/Loading";

const ChangeRequest = ({ navigation, route }) => {
  // Hooks and Consts
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { data, changeReqHeaders } = useChangeRequest();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { changeRequestsData: changeRequests } = useSelector(
    (state) => state.changeRequest
  );
  const {
    data: changeReqData,
    isLoading: changeLoading,
    error: changeError,
    refetch: refetchChange,
  } = useGetChangeRequestQuery({
    uid: user.id,
    query: "",
  });
  const { accessData } = useSelector((state) => state.maintenance);

  //Functions
  const handleAdd = () => handleNav("add", { type: "add" });

  const handleNav = (type, dataVal) => {
    (type === "edit" || type === "add") &&
      navigation.navigate("AddEditChange", {
        title: `${capitalize(type)} Change Request`,
        data: dataVal,
      });
  };

  const handleDisplay = (id) => !isDisplay(id, accessData);

  const handleRefetch = () => {
    changeError && refetchChange();
  };

  //Listeners
  useEffect(() => {
    data?.type && handleNav("edit", data);
  }, [data]);

  useEffect(() => {
    changeReqData && dispatch(setChangeRequestsData(changeReqData));
  }, [changeReqData]);

  useEffect(() => {
    error &&
      createAlert(
        "oneButton",
        "Error!",
        "Error in getting change requests.",
        { one: "Try again" },
        () => handleRefetch()
      );
  }, [error]);

  useEffect(() => {
    setError(changeError);
  }, [changeError]);

  useEffect(() => {
    setLoading(changeLoading);
  }, [changeLoading]);

  //Backhandler
  const handleBack = () => navigation.goBack();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );
    return () => backHandler.remove();
  }, []);

  if (error || loading) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <CustomTable
        rows={changeRequests}
        headers={changeReqHeaders}
        loading={loading}
        tableStyle={styles.table}
      />

      <FAB
        style={[styles.fab, handleDisplay(7) && { display: "none" }]}
        small
        icon="plus"
        onPress={handleAdd}
      />
    </View>
  );
};

export default ChangeRequest;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  table: { paddingBottom: 10 },
  fab: {
    position: "absolute",
    margin: 16,
    left: isApple ? 40 : 20,
    bottom: 30,
  },
});
