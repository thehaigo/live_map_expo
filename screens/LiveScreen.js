import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Modal, StyleSheet } from "react-native";
import { ListItem, Button, Icon, Input, Text } from "react-native-elements";

import { Context as MapsContext } from "../context/MapsContext";

const LiveScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [map, setMap] = useState({ name: "" });
  const {
    state: { maps },
    getMaps,
    createMap,
  } = useContext(MapsContext);
  useEffect(() => {
    const fetch = navigation.addListener("focus", () => {
      getMaps();
    });
    return () => fetch;
  }, [navigation]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          icon={<Icon name="add" size={35} />}
          onPress={() => setVisible(true)}
        />
      ),
    });
  });

  return (
    <View>
      <Modal visible={visible}>
        <View style={styles.modal}>
          <Text h2>New Map Name</Text>
          <Input
            value={map.name}
            onChangeText={(text) => {
              setMap({ name: text });
            }}
          />
          <View style={styles.btnGroup}>
            <Button
              containerStyle={styles.btn}
              titleStyle={styles.cancel}
              title={"cancel"}
              type="clear"
              onPress={() => {
                setVisible(false);
                setMap({ name: "" });
              }}
            />
            <Button
              containerStyle={styles.btn}
              title={"save"}
              type="clear"
              onPress={() => {
                setVisible(false);
                createMap(map);
                setMap({ name: "" });
              }}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={maps}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ListItem.Swipeable
            bottomDivider
            onPress={() => {
              navigation.navigate("LiveMap", {
                name: item.name,
                id: item.id,
              });
            }}
            rightContent={
              <Button
                title="delete"
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            }
          >
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flex: 1,
  },
  btnGroup: {
    flexDirection: "row",
  },
  btn: {
    flex: 1,
    margin: 5,
  },
  cancel: {
    color: "gray",
  },
});

export default LiveScreen;
