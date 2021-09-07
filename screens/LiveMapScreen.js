import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Switch, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PointsContext } from "../context/PointsContext";
import * as Location from "expo-location";

const LiveMapScreen = ({ navigation, route }) => {
  const {
    state: { token },
  } = useContext(AuthContext);
  const { createPoint } = useContext(PointsContext);
  const [recording, setRecording] = useState(false);
  const [watch, setWatch] = useState(null);
  const startWatching = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log(status);
        return;
      }

      const watch = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000,
          distanceInterval: 20,
        },
        (loc) => {
          createPoint({
            map_id: route.params.id,
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          });
        }
      );
      setWatch(watch);
    } catch (error) {
      console.log(error);
    }
  };
  const stopWatching = () => {
    if (watch) {
      watch.remove();
    }
    setWatch(null);
  };
  return (
    <View style={styles.view}>
      <WebView
        source={{
          uri: `http://localhost:4000/sp/${route.params.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
        style={styles.view}
      />
      <View style={styles.recording}>
        <Text>Recording</Text>
        <Switch
          value={recording}
          onValueChange={() => {
            if (!recording) {
              startWatching();
            } else {
              stopWatching();
            }
            setRecording(!recording);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    ...StyleSheet.absoluteFillObject,
  },
  recording: {
    position: "absolute",
    top: "90%",
    left: 240,
  },
});

export default LiveMapScreen;
