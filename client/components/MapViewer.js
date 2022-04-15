import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { setLocData } from "../features/GeocoderSlice";
import { timeConverter } from "../components/misc";
import { useDispatch, useSelector } from "react-redux";
import Color from "../constants/Color";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapViewer({ setLoading, label, time }) {
  const dispatch = useDispatch();
  const { coords, address } = useSelector((state) => state.location);
  const [permission, setPermission] = useState("undetermined");
  const [initRegion, setInitRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const markerRef = useRef(null);
  var mounted = true;

  useEffect(() => {
    getLocation();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    mounted && markerRef?.current?.showCallout();
  }, [markerRef.current]);

  const getLocation = async () => {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermission(status);
      return;
    }
    try {
      Location.getCurrentPositionAsync()
        .then((loc) => {
          const coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          return coords;
        })
        .then(async (coord) => {
          var addr = await Location.reverseGeocodeAsync(coord);
          if (mounted) {
            dispatch(setLocData({ coord, addr }));
            setInitRegion((prev) => ({ ...prev, ...coord }));
            setLoading(false);
            setPermission("granted");
          }
        });
    } catch (error) {
      Alert.alert(
        "Error!",
        `Error in getting your current location. ${error?.message}`,
        [{ text: "Try Again", onPress: () => {} }]
      );
    }
  };

  const handleRegionChange = (e) => {
    setInitRegion(e);
  };

  if (permission === "undetermined") {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={Color.primary.light} />
        <Paragraph>Loading...</Paragraph>
      </View>
    );
  }

  if (permission === "denied") {
    return (
      <View style={styles.container}>
        <Paragraph>Need permission to access map.</Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initRegion}
        onRegionChange={handleRegionChange}
      >
        <Marker coordinate={coords} ref={markerRef}>
          <Callout>
            <View style={styles.callout}>
              <Text>
                <Text style={styles.bold}>{label}:</Text> {timeConverter(time)}
              </Text>
              <Text multiline={true}>
                <Text style={styles.bold}>Location:</Text> {address}
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    width: 300,
    maxWidth: "100%",
  },
  bold: {
    fontWeight: "bold",
  },
});
