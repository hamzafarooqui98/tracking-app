import React from "react";
import { View, Content } from "native-base";
import MapView, { Marker } from "react-native-maps";

import styles from "./mapContainerStyles";
import SearchBox from "../SearchBox/index";

const MapContainer = ({ region, getSelectedAddressAndFare }) => {
  return (
    // <View style={styles.Container}>
    <Content contentContainerStyle={{ flex: 1 }}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} pinColor="green" />
      </MapView>
      <SearchBox getSelectedAddressAndFare={getSelectedAddressAndFare} />
    </Content>
    // </View>
  );
};

export default MapContainer;
