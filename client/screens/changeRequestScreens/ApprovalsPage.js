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

const ApprovalsPage = ({ navigation, route }) => {
  // Hooks and Consts
  const { name } = route;
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { data, approvalsHeaders } = useChangeRequest();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { approvalsData: approvals } = useSelector(
    (state) => state.changeRequest
  );

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
    type === "approval" &&
      navigation.navigate("ApprovalPage", {
        title: `${capitalize(type)} Change Request`,
        data: dataVal,
      });
  };

  const handleRefetch = () => {
    approvalsError && refetchApprovals();
  };

  //Listeners
  useEffect(() => {
    data?.type && handleNav("approval", data);
  }, [data]);

  useEffect(() => {
    approvalsData && dispatch(setApprovalsData(approvalsData));
  }, [approvalsData]);

  useEffect(() => {
    error &&
      createAlert(
        "oneButton",
        "Error!",
        "Error in getting change requests for approval.",
        { one: "Try again" },
        () => handleRefetch()
      );
  }, [error]);

  useEffect(() => {
    setError(approvalsError);
  }, [approvalsError]);

  useEffect(() => {
    setLoading(approvalsLoading);
  }, [approvalsLoading]);

  if (error || loading) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <CustomTable
        rows={approvals}
        headers={approvalsHeaders}
        loading={loading}
        tableStyle={styles.table}
      />
    </View>
  );
};

export default ApprovalsPage;

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
