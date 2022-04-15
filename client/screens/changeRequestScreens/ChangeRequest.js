import React, { useEffect, useState } from "react";
import { capitalize, isDisplay } from "../../components/misc";
import { createAlert } from "../../components/Alert";
import { FAB } from "react-native-paper";
import {
  setChangeRequestsData,
  setApprovalsData,
} from "../../features/ChangeRequestSlice";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetChangeRequestQuery,
  useGetApprovalsQuery,
} from "../../services/ChangeRequestService";
import { useChangeRequest } from "../../helpers/useChangeRequest";
import CustomTable from "../../components/CustomTable";
import Loading from "../../components/Loading";

const ChangeRequest = ({ navigation, route }) => {
  // Hooks and Consts
  const { name } = route;
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
    left: 40,
    bottom: 30,
  },
});
