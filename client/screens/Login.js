import React, { useState, useEffect } from "react";
import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { authSchema } from "../schema/authSchema";
import {
  Avatar,
  Button,
  Headline,
  TextInput,
  Surface,
} from "react-native-paper";
import { isApple } from "../constants/isApple";
import { createAlert } from "../components/Alert";
import { setAuthData } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useAuthenticateUserMutation } from "../services/AuthService";
import { useKeyboard } from "../components/useKeyboard";
import { useTheme } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginInput from "../components/LoginInput";
import ErrorText from "../components/ErrorText";

const Login = () => {
  const { colors, dark } = useTheme();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [authUser, { isLoading }] = useAuthenticateUserMutation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(authSchema),
  });
  const [secure, setSecure] = useState(true);
  const { keyboardHeight } = useKeyboard();

  //Functions
  const handleChange = (value, field) => {
    setValue(field, value, { shouldDirty: true });
  };

  const handleSecure = () => {
    setSecure((prev) => !prev);
  };
  const onSubmit = (dataVal) => {
    setError(false);
    isDirty &&
      authUser(dataVal).then((res) => {
        console.log("res");
        console.log(res);
        if (res?.data?.isLoggedIn) {
          dispatch(setAuthData(res.data));
        } else {
          dispatch(setAuthData({ isLoggedIn: false }));
          setError(true);
        }
      });
  };

  //Backhandler to Exit App
  useEffect(() => {
    const backAction = () => {
      createAlert(
        "twoButton",
        "Hold on!",
        "Are you sure you want to exit app?",
        { one: "Cancel", two: "OK" },
        () => {},
        () => BackHandler.exitApp()
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={"padding"}
        enabled={isApple ? true : false}
        style={[
          styles.screen,
          { backgroundColor: dark ? colors.background : "#2368EE" },
        ]}
      >
        <Surface
          style={{
            ...styles.container,
            bottom: isApple ? keyboardHeight : 0,
          }}
        >
          <ScrollView
            contentContainerStyle={[
              styles.form,
              { paddingBottom: keyboardHeight > 1 ? 10 : 20 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Headline style={styles.headline}>Time & Attendance</Headline>

            <Avatar.Icon
              style={[styles.avatar, { backgroundColor: colors.card }]}
              size={isApple ? 100 : 70}
              color={dark ? "#fff" : "#2C292A"}
              icon="account-clock"
            />

            <Controller
              control={control}
              name="username"
              render={({ field: { value } }) => (
                <LoginInput
                  label="@username"
                  error={errors?.username}
                  style={styles.input}
                  onChange={(value) => handleChange(value, "username")}
                  value={value}
                  icon="account"
                  iconColor={"#A31600"}
                  disabled={isLoading}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { value } }) => (
                <LoginInput
                  label="@password"
                  error={errors?.password}
                  style={styles.input}
                  onChange={(value) => handleChange(value, "password")}
                  value={value}
                  icon="lock"
                  iconColor={"#A31600"}
                  secureTextEntry={secure}
                  right={
                    <TextInput.Icon
                      name={secure ? "eye" : "eye-off"}
                      onPress={handleSecure}
                      color={"#A31600"}
                    />
                  }
                  disabled={isLoading}
                />
              )}
            />
            {error && (
              <ErrorText style={{ width: "80%" }}>
                &#x26A0; Incorrect Password!
              </ErrorText>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
              labelStyle={styles.buttonText}
              loading={isLoading}
              disabled={isLoading}
              uppercase={false}
            >
              Login
            </Button>
          </ScrollView>
        </Surface>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    width: "100%",
    paddingTop: 30,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: isApple ? 10 : 5,
    paddingBottom: isApple ? 10 : 5,
    height: "auto",
    minWidth: isApple ? "95%" : "99%",
    maxWidth: isApple ? "95.01%" : "99.01%",
  },
  headline: {
    color: "#A31600",
    fontSize: isApple ? 30 : 25,
  },
  avatar: {
    marginVertical: 20,
  },
  input: {
    width: "80%",
    fontSize: isApple ? 20 : 18,
    padding: isApple ? 10 : 5,
  },
  button: {
    width: "80%",
    margin: 10,
    backgroundColor: "#5BAB5A",
  },
  buttonText: {
    paddingVertical: 10,
    fontSize: isApple ? 20 : 18,
  },
});
