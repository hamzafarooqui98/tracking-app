import React from "react";
import { View } from "native-base";
import MapView, { Marker } from "react-native-maps";

import styles from "./mapContainerStyles";
import SearchBox from "../SearchBox/index";

const MapContainer = ({ region }) => {
  return (
    <View style={styles.Container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} pinColor="green" />
      </MapView>
      <SearchBox />
    </View>
  );
};

export default MapContainer;
