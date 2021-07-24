import React, { useRef } from "react";
import { Content } from "native-base";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import styles from "./mapContainerStyles";
import { GOOGLE_MAPS_APIKEY } from "../../../../Utilities/googleMapKey";
import SearchBox from "../SearchBox/index";
import imagesPath from "../../../../Utilities/imagesPath";

const MapContainer = ({
  region,
  getSelectedAddressAndFare,
  selectedAddress,
}) => {
  const mapRef = useRef();

  return (
    // <View style={styles.Container}>
    <Content contentContainerStyle={{ flex: 1 }}>
      <MapView style={styles.map} initialRegion={region} ref={mapRef}>
        <Marker coordinate={region} image={imagesPath.userMarker} />
        {selectedAddress && (
          <Marker
            coordinate={{
              latitude: selectedAddress.lat,
              longitude: selectedAddress.lng,
            }}
            image={imagesPath.destinationMarker}
          />
        )}
        <MapViewDirections
          origin={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          destination={{
            latitude: selectedAddress.lat,
            longitude: selectedAddress.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#10c450"
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 15,
                bottom: 100,
                left: 15,
                top: 100,
              },
            });
          }}
        />
      </MapView>
      <SearchBox getSelectedAddressAndFare={getSelectedAddressAndFare} />
    </Content>
    // </View>
  );
};

export default MapContainer;
