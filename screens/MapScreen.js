import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Switch } from "react-native-elements";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import { Context as PointsContext } from "../context/PointsContext";
const MapScreen = ({ navigation, route }) => {
  const { createPoint } = useContext(PointsContext);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [tracking, setTracking] = useState(false);
  const [recording, setRecording] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("error");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={region}
        onRegionChange={(region) => {
          setRegion(region);
        }}
        onUserLocationChange={(e) => {
          if (!tracking) {
            return;
          }
          const location = e.nativeEvent.coordinate;
          if (!location) {
            return;
          }
          setRegion({
            ...region,
            latitude: location.latitude,
            longitude: location.longitude,
          });
          if (!recording) {
            return;
          }
          createPoint({
            map_id: route.params.id,
            lat: location.latitude,
            lng: location.longitude,
          });
        }}
      />
      <View style={styles.tracking}>
        <Text>Tracking</Text>
        <Switch value={tracking} onValueChange={() => setTracking(!tracking)} />
      </View>
      <View style={styles.recording}>
        <Text>Recording</Text>
        <Switch
          value={recording}
          onValueChange={() => setRecording(!recording)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  tracking: {
    position: "absolute",
    top: "90%",
    left: 80,
  },
  recording: {
    position: "absolute",
    top: "90%",
    left: 240,
  },
});

export default MapScreen;
