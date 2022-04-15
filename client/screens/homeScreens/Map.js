import React, { useState, useRef } from "react";
import { Button, Card, Paragraph } from "react-native-paper";
import { createAlert } from "../../components/Alert";
import { getRound } from "../../components/misc";
import { StyleSheet, Text, View } from "react-native";
import { typeData } from "./Home";
import { usePostLogsMutation } from "../../services/LogService";
import { useSelector } from "react-redux";
import LogButton from "../../components/LogButton";
import MapViewer from "../../components/MapViewer";

const Map = ({ navigation, route }) => {
  const { type, time } = route.params;
  const { id } = useSelector((state) => state.auth.authData);
  const { coords, address } = useSelector((state) => state.location);
  const [postLog] = usePostLogsMutation();
  const [loading, setLoading] = useState(true);
  const [timeLog, setTimeLog] = useState(time);
  const prev = typeData?.filter((item) => item.type === type).pop();
  const buttonData = typeData?.filter((item) => item.type === 0).pop();
  const confirmData = {
    ...buttonData,
    label: `Confirm ${prev.label}?`,
    color: prev.color,
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleError = () => {
    createAlert(
      "oneButton",
      "Error!",
      "Time Log was not saved.",
      { one: "Try Again" },
      handleConfirm
    );
  };

  const handleConfirm = () => {
    setLoading(true);
    const data = {
      date: timeLog,
      datetime: timeLog,
      isUploaded: false,
      TimeLogTypeId: type,
      UserId: id,
      coordinates: coords,
      location: address,
    };
    postLog(data)
      .then((res) => {
        setLoading(false);
        if (res) {
          setTimeLog(null);
          handleBack();
        } else {
          handleError();
        }
      })
      .catch((error) => {
        setLoading(false);
        handleError();
      });
  };

  return (
    <View style={styles.screen}>
      <MapViewer
        style={styles.map}
        time={time}
        label={prev?.label}
        setLoading={setLoading}
      />
      <View style={styles.container}>
        <View style={styles.display}>
          <Button
            mode="contained"
            onPress={handleBack}
            icon={"arrow-left"}
            uppercase={false}
            style={styles.back}
            labelStyle={{ paddingVertical: 10 }}
          >
            Back
          </Button>
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>
                <Text style={styles.bold}>Lat: </Text>
                {getRound(coords?.latitude ? coords.latitude : 0, 4) || 0}{" "}
                <Text style={styles.bold}>Lon: </Text>
                {getRound(coords?.longitude ? coords.longitude : 0, 4) || 0}
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
        <LogButton
          type={type}
          onLog={handleConfirm}
          loading={loading}
          button={confirmData}
          style={styles.log}
        />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  display: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    elevation: 0,
    marginHorizontal: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  back: {
    justifyContent: "center",
    backgroundColor: "#a2a2a2",
    borderRadius: 25,
    marginHorizontal: 10,
    marginRight: 0,
  },
  log: {
    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});
