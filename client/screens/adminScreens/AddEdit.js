import React, { useState, useEffect } from "react";
import { Button, Card, TextInput, Title, Paragraph } from "react-native-paper";
import { createAlert } from "../../components/Alert";
import {
  dateTimeConverter,
  dirtyValues,
  isDisplay,
} from "../../components/misc";
import { isApple } from "../../constants/isApple";
import { maintenanceSchema, tagSchema } from "../../schema/maintenanceSchema";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { addUserSchema, editUserSchema } from "../../schema/userSchema";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  usePatchMaintenanceMutation,
  usePostMaintenanceMutation,
} from "../../services/MaintenanceService";
import {
  usePostNewUserMutation,
  usePatchUserMutation,
} from "../../services/AuthService";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput";
import CustomPicker from "../../components/CustomPicker";

const AddEdit = ({ navigation, route }) => {
  //Hooks & Constants
  const [secure, setSecure] = useState(true);
  const { data, menuId: type } = route.params;
  const [
    patchMaintenance,
    { isError: errPatchMain, isLoading: loadPatchMain },
  ] = usePatchMaintenanceMutation();
  const [postMaintenance, { isError: errPostMain, isLoading: loadPostMain }] =
    usePostMaintenanceMutation();
  const [patchUser, { isError: errPatchUser, isLoading: loadPatchUser }] =
    usePatchUserMutation();
  const [postUser, { isError: errPostUser, isLoading: loadPostUser }] =
    usePostNewUserMutation();
  const { id: uid } = useSelector((state) => state.auth.authData);
  const { approvers, roles, permissions } = useSelector(
    (state) => state.maintenance.maintenanceData
  );
  const { accessData } = useSelector((state) => state.maintenance);
  const [isDisabled, setDisabled] = useState(false);

  const statusItems = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];
  const approverItems = approvers
    ?.map(({ id, fullname }) => ({
      value: id,
      label: fullname,
    }))
    ?.sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));

  const resolver =
    type === 9
      ? tagSchema
      : type === 5
      ? data.type === "add"
        ? addUserSchema
        : editUserSchema
      : maintenanceSchema;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    resolver: yupResolver(resolver),
    defaultValues: {
      title: "",
      status: true,
      approverId: approvers[0]?.id,
      RoleId: roles[0]?.id,
      ...data,
    },
  });

  const [loading, setLoading] = useState(false);
  const details = type === 5 && [
    { label: "User Id: ", value: data?.id },
    { label: "Usename: ", value: data?.username },
    {
      label: "Last Login: ",
      value: dateTimeConverter(data?.lastLogin),
    },
    {
      label: "Created Date: ",
      value: dateTimeConverter(data?.createdAt),
    },
    {
      label: "Updated Date: ",
      value: dateTimeConverter(data?.updatedAt),
    },
  ];

  //Listeners
  useEffect(() => {
    (errPatchMain || errPostMain || errPatchUser || errPostUser) &&
      createAlert(
        "twoButton",
        "Error!",
        "Error encountered.",
        { one: "Try again!", two: "Cancel" },
        () => handleSubmit(onSubmit),
        () => {}
      );
  }, [errPatchMain, errPostMain, errPatchUser, errPostUser]);

  useEffect(() => {
    const isLoad =
      loadPostMain || loadPatchMain || loadPostUser || loadPatchUser;
    isLoad && setLoading(isLoad);
  }, [loadPostMain, loadPatchMain, loadPostUser, loadPatchUser]);

  useEffect(() => {
    setDisabled(loading || handleDisplay(8));
  }, [loading]);

  //Functions
  const handleChange = (value, field) => {
    setValue(field, value, { shouldDirty: true });
  };

  const onSubmit = (dataSubmit) => {
    var results;
    var dataVal =
      data?.type === "edit"
        ? { ...dirtyValues(dirtyFields, dataSubmit), id: data.id }
        : dataSubmit;
    if (dataSubmit?.deleted) {
      dataVal = { ...dataVal, deleted: true, status: false };
    }
    const params = {
      data: dataVal,
      uid,
      type,
    };
    if (type === 5) {
      results = data?.type === "edit" ? patchUser(params) : postUser(params);
    } else {
      results =
        data?.type === "edit"
          ? patchMaintenance(params)
          : postMaintenance(params);
    }
    results.then(
      (result) =>
        (result?.data?.length > 0 || result?.data) && navigation.goBack()
    );
  };

  const getItems = (arr) =>
    arr
      ?.filter(({ status }) => status === true)
      ?.map(({ id, title }) => ({
        value: id,
        label: title,
      }))
      ?.sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));

  const handleItems = (type) =>
    type === "role" ? getItems(roles) : getItems(permissions);

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

  const handleSecure = () => setSecure((prev) => !prev);

  const handleDisplay = (id) => !isDisplay(id, accessData);

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
          {type === 9 && (
            <>
              <Controller
                control={control}
                name="RoleId"
                render={({ field: { value } }) => (
                  <CustomPicker
                    label="Role"
                    error={errors?.RoleId}
                    style={styles.input}
                    onSelect={(value) => handleChange(value, "RoleId")}
                    defaultValue={value}
                    loading={loading}
                    disabled={isDisabled}
                    pickerOptions={handleItems("role")}
                  />
                )}
              />
              <Controller
                control={control}
                name="PermissionId"
                render={({ field: { value } }) => (
                  <CustomPicker
                    label="Permission"
                    error={errors?.PermissionId}
                    style={styles.input}
                    onSelect={(value) => handleChange(value, "PermissionId")}
                    defaultValue={value}
                    loading={loading}
                    disabled={isDisabled}
                    pickerOptions={handleItems("perms")}
                  />
                )}
              />
            </>
          )}

          {type === 5 ? (
            <>
              {data?.type === "add" && (
                <>
                  <Controller
                    control={control}
                    name="username"
                    render={({ field: { value } }) => (
                      <CustomInput
                        label="Username"
                        error={errors?.username}
                        style={styles.input}
                        onChange={(value) => handleChange(value, "username")}
                        value={value}
                        disabled={isDisabled}
                        autoCapitalize={"none"}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { value } }) => (
                      <CustomInput
                        label="password"
                        error={errors?.password}
                        style={styles.input}
                        onChange={(value) => handleChange(value, "password")}
                        value={value}
                        disabled={isDisabled}
                        autoCapitalize={"none"}
                        secureTextEntry={secure}
                        right={
                          <TextInput.Icon
                            name={secure ? "eye" : "eye-off"}
                            onPress={handleSecure}
                            disabled={loading}
                          />
                        }
                      />
                    )}
                  />
                </>
              )}

              <Controller
                control={control}
                name="firstname"
                render={({ field: { value } }) => (
                  <CustomInput
                    label="Firstname"
                    error={errors?.firstname}
                    style={styles.input}
                    onChange={(value) => handleChange(value, "firstname")}
                    value={value}
                    disabled={isDisabled}
                  />
                )}
              />

              <Controller
                control={control}
                name="lastname"
                render={({ field: { value } }) => (
                  <CustomInput
                    label="Lastname"
                    error={errors?.lastname}
                    style={styles.input}
                    onChange={(value) => handleChange(value, "lastname")}
                    value={value}
                    disabled={isDisabled}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { value } }) => (
                  <CustomInput
                    label="Email"
                    error={errors?.email}
                    style={styles.input}
                    onChange={(value) => handleChange(value, "email")}
                    value={value}
                    disabled={isDisabled}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                  />
                )}
              />

              <Controller
                control={control}
                name="approverId"
                render={({ field: { value } }) => (
                  <CustomPicker
                    label="Approver"
                    error={errors?.approverId}
                    style={styles.input}
                    onSelect={(value) => handleChange(value, "approverId")}
                    defaultValue={value}
                    loading={loading}
                    disabled={isDisabled}
                    pickerOptions={approverItems}
                  />
                )}
              />

              <Controller
                control={control}
                name="RoleId"
                render={({ field: { value } }) => (
                  <CustomPicker
                    label="Role"
                    error={errors?.role}
                    style={styles.input}
                    onSelect={(value) => handleChange(value, "RoleId")}
                    defaultValue={value}
                    loading={loading}
                    disabled={isDisabled}
                    pickerOptions={handleItems("role")}
                  />
                )}
              />
            </>
          ) : (
            type !== 9 && (
              <Controller
                control={control}
                name="title"
                render={({ field: { value } }) => (
                  <CustomInput
                    label="Title"
                    error={errors?.title}
                    style={styles.input}
                    onChange={(value) => handleChange(value, "title")}
                    value={value}
                    disabled={isDisabled}
                  />
                )}
              />
            )
          )}

          <Controller
            control={control}
            name="status"
            render={({ field: { value } }) => (
              <CustomPicker
                label="Status"
                error={errors?.status}
                style={styles.input}
                onSelect={(value) => handleChange(value, "status")}
                defaultValue={value}
                loading={loading}
                disabled={isDisabled}
                pickerOptions={statusItems}
              />
            )}
          />
        </View>
        <View
          style={[styles.buttonCont, handleDisplay(11) && { display: "none" }]}
        >
          {data?.type === "edit" && type === 5 && (
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

export default AddEdit;

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
    paddingBottom: isApple ? 75 : 5,
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
