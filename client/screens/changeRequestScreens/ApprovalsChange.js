import React, { useEffect, useState } from "react";
import { createAlert } from "../../components/Alert";
import {
  capitalize,
  dateConverter,
  dateTimeConverter,
  isDisplay,
  filterObj,
  timeConverter,
} from "../../components/misc";
import { BackHandler, StyleSheet, View } from "react-native";
import { Button, Card, Chip, Subheading } from "react-native-paper";
import { usePostApprovalMutation } from "../../services/ChangeRequestService";
import { useSelector } from "react-redux";

const ApprovalsChange = ({ navigation, route }) => {
  //Hooks
  const { data } = route.params;
  const [postApproval, { isError: errPost, isLoading: loadPost }] =
    usePostApprovalMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id: uid, RoleId: roleId } = useSelector(
    (state) => state.auth.authData
  );

  const isForApproval = data?.ChangeRequestStatusId === 1;

  const { accessData } = useSelector((state) => state.maintenance);
  const icon =
    data?.ChangeRequestStatusId === 1
      ? { name: "circle-slice-3", color: "#FFCC00" }
      : data?.ChangeRequestStatusId === 2
      ? { name: "check-circle", color: "green" }
      : { name: "close-circle", color: "red" };

  const cardData = [
    { label: "Date", value: dateConverter(data?.date) },
    {
      label: capitalize(data?.timeLogType),
      value: timeConverter(data?.datetime),
    },
    { label: "Requested By", value: data?.fullname },
    { label: "Username", value: data?.username },
    { label: "Created Date", value: dateTimeConverter(data?.createdAt) },
    { label: "Updated Date", value: dateTimeConverter(data?.updatedAt) },
  ];

  //Functions
  const handleButton = (action) => {
    var changeReq = { id: data?.id };
    const filter = ["date", "datetime", "UserId", "TimeLogTypeId"];
    var timelog = filterObj(data, filter);
    timelog = {
      ...timelog,
      isUploaded: false,
    };

    if (action === "approve") {
      changeReq = { ...changeReq, ChangeRequestStatusId: 2 };
    } else {
      changeReq = { ...changeReq, ChangeRequestStatusId: 3 };
    }

    const params = {
      data: action === "approve" ? { changeReq, timelog } : { changeReq },
      uid,
    };

    postApproval(params)
      .then(({ data: isSuccess }) => {
        isSuccess
          ? navigation.goBack()
          : createAlert(
              "oneButton",
              "Approval Failed!",
              "Change Request approval has failed. Contact Admin.",
              { one: "OK" },
              () => {}
            );
      })
      .catch((err) => {});
  };

  const handleDisplay = (id) => !isDisplay(id, accessData);

  //Listeners
  useEffect(() => {
    setLoading(loadPost);
  }, [loadPost]);

  useEffect(() => {
    setError(errPost);
  }, [errPost]);

  useEffect(() => {
    error &&
      createAlert(
        "oneButton",
        "Error!",
        "Error encountered.",
        { one: "Try again!" },
        () => {}
      );
  }, [error]);

  //Backhandler
  const handleBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Subheading style={styles.title}>Change {data?.timeLogType}</Subheading>
        {cardData.map((item, i) => (
          <View style={styles.textCont} key={i}>
            <Subheading style={{ fontWeight: "bold" }}>
              {item.label}:{" "}
            </Subheading>
            <Subheading>{item.value}</Subheading>
          </View>
        ))}
        <View>
          <Subheading style={{ fontWeight: "bold" }}>Reason:</Subheading>
          <Subheading>{data?.reason}</Subheading>
        </View>
        <View>
          <Subheading style={{ flexDirection: "column", fontWeight: "bold" }}>
            Status:
          </Subheading>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Chip icon={icon.name} selectedColor={icon.color}>
              {data?.changeReqStatus}
            </Chip>
          </View>
        </View>
      </Card>

      {isForApproval && (
        <View
          style={[styles.buttonCont, handleDisplay(9) && { display: "none" }]}
        >
          <Button
            mode="contained"
            onPress={() => handleButton("approve")}
            style={[styles.button, loading && { backgroundColor: "gray" }]}
            labelStyle={styles.buttonText}
            loading={loading}
            disabled={loading}
            uppercase={false}
          >
            Approve
          </Button>
          <Button
            mode="contained"
            onPress={() => handleButton("reject")}
            style={[
              styles.button,
              styles.buttonDel,
              loading && { backgroundColor: "gray" },
            ]}
            labelStyle={styles.buttonText}
            loading={loading}
            disabled={loading}
            uppercase={false}
          >
            Reject
          </Button>
        </View>
      )}
    </View>
  );
};

export default ApprovalsChange;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    padding: 10,
    marginVertical: 5,
    width: "95%",
  },
  textCont: { display: "flex", flexDirection: "row" },
  title: { fontWeight: "bold", textAlign: "center" },
  buttonCont: { display: "flex", flexDirection: "row", width: "100%" },
  button: {
    flex: 1,
    backgroundColor: "#5BAB5A",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  buttonDel: {
    backgroundColor: "red",
  },
  buttonText: {
    paddingVertical: 10,
    fontSize: 20,
  },
});
