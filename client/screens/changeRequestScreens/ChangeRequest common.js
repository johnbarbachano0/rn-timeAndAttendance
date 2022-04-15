import React, { useEffect, useState } from "react";
import { capitalize } from "../../components/misc";
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
  const isApprovals = name === "ApprovalsChangeRequest";
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { data, changeReqHeaders, approvalsHeaders } = useChangeRequest();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { changeRequestsData: changeRequests, approvalsData: approvals } =
    useSelector((state) => state.changeRequest);
  const {
    data: changeReqData,
    isLoading: changeLoading,
    error: changeError,
    refetch: refetchChange,
  } = useGetChangeRequestQuery({
    uid: user.id,
    query: "",
  });
  const {
    data: approvalsData,
    isLoading: approvalsLoading,
    error: approvalsError,
    refetch: refetchApprovals,
  } = useGetApprovalsQuery({
    uid: user.id,
  });

  //Functions
  const handleAdd = () => handleNav("add", { type: "add" });

  const handleNav = (type, dataVal) => {
    (type === "edit" || type === "add") &&
      navigation.navigate("AddEditChange", {
        title: `${capitalize(type)} Change Request`,
        data: dataVal,
      });

    type === "approval" &&
      navigation.navigate("ApprovalPage", {
        title: `${capitalize(type)} Change Request`,
        data: dataVal,
      });
  };

  const handleRefetch = () => {
    changeError && refetchChange();
    approvalsError && refetchApprovals();
  };

  //Listeners
  useEffect(() => {
    data?.type && handleNav(isApprovals ? "approval" : "edit", data);
  }, [data]);

  useEffect(() => {
    changeReqData && dispatch(setChangeRequestsData(changeReqData));
  }, [changeReqData]);

  useEffect(() => {
    approvalsData && dispatch(setApprovalsData(approvalsData));
  }, [approvalsData]);

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
    setError(changeError || approvalsError);
  }, [changeError, approvalsError]);

  useEffect(() => {
    setLoading(changeLoading || approvalsLoading);
  }, [changeLoading, approvalsLoading]);

  if (error || loading) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <CustomTable
        rows={isApprovals ? approvals : changeRequests}
        headers={isApprovals ? approvalsHeaders : changeReqHeaders}
        loading={loading}
        tableStyle={styles.table}
      />
      {!isApprovals && (
        <FAB style={styles.fab} small icon="plus" onPress={handleAdd} />
      )}
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
