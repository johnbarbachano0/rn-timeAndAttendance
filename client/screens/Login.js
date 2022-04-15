import React, { useState, useEffect } from "react";
import {
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
import { setAuthData } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useAuthenticateUserMutation } from "../services/AuthService";
import { useKeyboard } from "../components/useKeyboard";
import { useTheme } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginInput from "../components/LoginInput";

const Login = () => {
  const { colors, dark } = useTheme();
  const dispatch = useDispatch();
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

  const handleChange = (value, field) => {
    setValue(field, value, { shouldDirty: true });
  };

  const handleSecure = () => {
    setSecure((prev) => !prev);
  };

  const onSubmit = (dataVal) => {
    isDirty &&
      authUser(dataVal).then((res) => {
        if (res?.data?.isLoggedIn) {
          dispatch(setAuthData(res.data));
        } else {
          dispatch(setAuthData({ isLoggedIn: false }));
        }
      });
  };

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
            bottom: keyboardHeight,
          }}
        >
          <ScrollView
            contentContainerStyle={[
              styles.form,
              { paddingBottom: keyboardHeight > 1 ? 10 : 50 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Headline style={styles.headline}>Time & Attendance</Headline>

            <Avatar.Icon
              style={[styles.avatar, { backgroundColor: colors.card }]}
              size={100}
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
    paddingBottom: isApple ? 50 : 5,
    height: "auto",
    minWidth: isApple ? "95%" : "99%",
    maxWidth: isApple ? "95.01%" : "99.01%",
  },
  headline: {
    color: "#A31600",
    fontSize: 30,
  },
  avatar: {
    marginVertical: 20,
  },
  input: {
    width: "80%",
    fontSize: 20,
    padding: 10,
  },
  button: {
    width: "80%",
    margin: 10,
    backgroundColor: "#5BAB5A",
  },
  buttonText: {
    paddingVertical: 10,
    fontSize: 20,
  },
});
