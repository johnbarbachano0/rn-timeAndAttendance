import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Chip, Subheading, Surface } from "react-native-paper";
import { avatarLabel, fullname, getHourMinSec } from "./misc";

const UserInfo = ({ user, workStatusDesc, workId, logs }) => {
  const login = logs.filter((log) => log.TimeLogTypeId === 1).pop()?.datetime;
  const logout = logs.filter((log) => log.TimeLogTypeId === 2).pop()?.datetime;
  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        <Avatar.Text
          style={styles.avatar}
          size={50}
          label={avatarLabel(user.firstname, user.lastname)}
        />
        <View style={styles.info}>
          <Subheading style={styles.infoText}>
            Hi {fullname(user.firstname, user.lastname)}
          </Subheading>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Chip
              icon={"clock-time-eight"}
              style={styles.chip}
              selectedColor={
                workId === 3 ? "red" : workId === 2 ? "#17800E" : "#FF9900"
              }
            >
              {workStatusDesc}
            </Chip>
          </View>
        </View>
        <View style={styles.timeLogs}>
          {login && (
            <Chip
              icon={"login-variant"}
              style={styles.chipLog}
              selectedColor={"#17800E"}
            >
              {getHourMinSec(login)}
            </Chip>
          )}
          {logout && (
            <Chip
              icon={"logout-variant"}
              style={styles.chipLog}
              selectedColor={"red"}
            >
              {getHourMinSec(logout)}
            </Chip>
          )}
        </View>
      </View>
    </Surface>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    marginBottom: 10,
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  avatar: {
    margin: 10,
    backgroundColor: "#207178",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  infoText: { paddingLeft: 10 },
  chipLog: {
    width: 125,
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  timeLogs: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginHorizontal: 10,
  },
  logText: { padding: 2.5 },
});
