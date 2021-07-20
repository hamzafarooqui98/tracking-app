import React from "react";
import { View, Content } from "native-base";
import MapView, { Marker } from "react-native-maps";

import styles from "./mapContainerStyles";
import SearchBox from "../SearchBox/index";
import SearchResults from "../SearchResults/index";

const MapContainer = ({
  region,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
}) => {
  return (
    // <View style={styles.Container}>
    <Content contentContainerStyle={{ flex: 1 }}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} pinColor="green" />
      </MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModal={toggleSearchResultModal}
        getAddressPredictions={getAddressPredictions}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) && (
        <SearchResults predictions={predictions} />
      )}
    </Content>
    // </View>
  );
};

export default MapContainer;
