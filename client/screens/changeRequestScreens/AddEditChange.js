import React, { useEffect, useState } from "react";
import { createAlert } from "../../components/Alert";
import { changeReqSchema } from "../../schema/changeReqSchema";
import {
  combineDateTime,
  dateTimeConverter,
  dirtyValues,
  isDisplay,
} from "../../components/misc";
import { isApple } from "../../constants/isApple";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, TextInput, Title, Paragraph } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import {
  usePatchChangeRequestMutation,
  usePostChangeRequestMutation,
} from "../../services/ChangeRequestService";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput";
import CustomPicker from "../../components/CustomPicker";
import DatePicker from "../../components/DatePicker";

const AddEditChange = ({ navigation, route }) => {
  //Hooks & Constants
  var currDate = new Date();
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);
  const { data } = route.params;

  const { id: uid, RoleId: roleId } = useSelector(
    (state) => state.auth.authData
  );
  const { timeLogTypes, changeReq: changeReqStatus } = useSelector(
    (state) => state.maintenance.maintenanceData
  );
  const [postChangeReq, { isError: errPost, isLoading: loadPost }] =
    usePostChangeRequestMutation();
  const [patchChangeReq, { isError: errPatch, isLoading: loadPatch }] =
    usePatchChangeRequestMutation();
  const [loading, setLoading] = useState(false);
  const { accessData } = useSelector((state) => state.maintenance);
  const [isDisabled, setDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    resolver: yupResolver(changeReqSchema),
    defaultValues: {
      date: currDate,
      datetime: currDate,
      ChangeRequestStatusId: 1,
      TimeLogTypeId: 1,
      ...data,
    },
  });

  const details = [
    { label: "User Id: ", value: data?.UserId },
    { label: "Username: ", value: data?.username },
    { label: "Requested By: ", value: data?.firstname + " " + data?.lastname },
    { label: "Updated Date: ", value: dateTimeConverter(data?.updatedAt) },
    { label: "Created Date: ", value: dateTimeConverter(data?.createdAt) },
  ];

  const timeLogTypeItems = timeLogTypes
    .filter((type) => type.status === true)
    .map((type) => ({ label: type.title, value: type.id }));
  const changeReqStatusItems = changeReqStatus
    .filter((item) => item.status === true)
    .map((item) => ({ label: item.title, value: item.id }));

  //Functions
  const handleChange = (value, field) => {
    setValue(field, value, { shouldDirty: true });
    if (field === "date") {
      const currDate = value;
      const currTime = getValues("datetime");
      const newDatetime = combineDateTime(currDate, currTime);
      setValue("datetime", newDatetime, { shouldDirty: true });
    }
  };

  const handleDisplay = (id) => !isDisplay(id, accessData);

  const onSubmit = (dataSubmit) => {
    var dataVal =
      data?.type === "edit"
        ? { ...dirtyValues(dirtyFields, dataSubmit), id: data.id }
        : dataSubmit;

    if (dataSubmit?.deleted) {
      dataVal = { ...dataVal, deleted: true, status: false };
    }

    if (data?.type === "add") {
      dataVal = { ...dataVal, UserId: uid };
    }

    const params = {
      data: dataVal,
      uid,
    };

    var results;
    results =
      data?.type === "edit" ? patchChangeReq(params) : postChangeReq(params);
    results
      .then((result) => {
        (result?.data?.length > 0 || result?.data) && navigation.goBack();
      })
      .catch((err) => {});
  };

  const handleDelete = () => {
    createAlert(
      "twoButton",
      "Confirm Delete?",
      "Are you sure you want to delete? This action cannot be undone.",
      { one: "Yes", two: "No" },
      () => onSubmit({ id: data.id, deleted: true }),
      () => {}
    );
  };

  //Listeners
  useEffect(() => {
    (errPatch || errPost) &&
      createAlert(
        "twoButton",
        "Error!",
        "Error encountered.",
        { one: "Try again!", two: "Cancel" },
        () => handleSubmit(onSubmit),
        () => {}
      );
  }, [errPatch, errPost]);

  useEffect(() => {
    const isLoad = loadPost || loadPatch;
    isLoad && setLoading(isLoad);
  }, [loadPost, loadPatch]);

  useEffect(() => {
    setDisabled(
      loading || handleDisplay(8) || data?.ChangeRequestStatusId !== 1
    );
  }, [loading, data]);

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      enabled={isApple ? true : false}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textfieldCont}>
          <Controller
            control={control}
            name={"date"}
            render={({ field: { value } }) => (
              <DatePicker
                label={"Date"}
                error={errors.date}
                style={styles.input}
                onChange={(evt, value) => handleChange(value, "date")}
                value={value}
                disabled={isDisabled}
                type={"date"}
                maximumDate={new Date()}
              />
            )}
          />

          <Controller
            control={control}
            name={"datetime"}
            render={({ field: { value } }) => (
              <DatePicker
                label={"Time"}
                error={errors.datetime}
                style={styles.input}
                onChange={(evt, value) => handleChange(value, "datetime")}
                value={value}
                disabled={isDisabled}
                type={"time"}
              />
            )}
          />

          <Controller
            control={control}
            name="TimeLogTypeId"
            render={({ field: { value } }) => (
              <CustomPicker
                label="Type"
                error={errors?.changeReqStatus}
                style={styles.input}
                onSelect={(value) => handleChange(value, "TimeLogTypeId")}
                defaultValue={value}
                loading={loading}
                disabled={isDisabled}
                pickerOptions={timeLogTypeItems}
              />
            )}
          />

          <Controller
            control={control}
            name="ChangeRequestStatusId"
            render={({ field: { value } }) => (
              <CustomPicker
                label="Status"
                error={errors?.ChangeRequestStatusId}
                style={styles.input}
                onSelect={(value) =>
                  handleChange(value, "ChangeRequestStatusId")
                }
                defaultValue={value}
                loading={loading || handleDisplay(8)}
                disabled={true}
                pickerOptions={changeReqStatusItems}
              />
            )}
          />

          <Controller
            control={control}
            name="reason"
            render={({ field: { value } }) => (
              <CustomInput
                label="Reason"
                error={errors?.reason}
                style={styles.input}
                onChange={(value) => handleChange(value, "reason")}
                value={value}
                disabled={isDisabled}
                autoCapitalize={"sentences"}
              />
            )}
          />

          {data?.type === "edit" && (
            <Card style={styles.card}>
              <Title>Other Details:</Title>
              {details.map((item, i) => (
                <View style={{ flexDirection: "row" }} key={i}>
                  <Paragraph style={{ fontWeight: "bold" }}>
                    {item.label}
                  </Paragraph>
                  <Paragraph>{item.value}</Paragraph>
                </View>
              ))}
            </Card>
          )}
        </View>
        <View
          style={[
            styles.buttonCont,
            (handleDisplay(8) || data?.ChangeRequestStatusId !== 1) && {
              display: "none",
            },
          ]}
        >
          {data?.type === "edit" && (
            <Button
              mode="contained"
              onPress={handleDelete}
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
              Delete
            </Button>
          )}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={[
              styles.button,
              (!isDirty || loading) && { backgroundColor: "gray" },
            ]}
            labelStyle={styles.buttonText}
            loading={loading}
            disabled={loading || !isDirty}
            uppercase={false}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEditChange;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  form: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: isApple ? 10 : 5,
    paddingBottom: isApple ? 20 : 5,
    minWidth: isApple ? "95%" : "99%",
    maxWidth: isApple ? "95.01%" : "99.01%",
  },
  textfieldCont: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: "100%",
    fontSize: 20,
    padding: 10,
    color: "black",
    maxHeight: 150,
  },
  buttonCont: {
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#5BAB5A",
    marginTop: 10,
  },
  buttonDel: {
    backgroundColor: "red",
  },
  buttonText: {
    paddingVertical: 10,
    fontSize: 20,
  },
  picker: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  card: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
});
