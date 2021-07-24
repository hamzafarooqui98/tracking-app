import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import styles from "./searchBoxStyles";

const SearchBox = ({ getSelectedAddressAndFare }) => {
  handleGetSelectedAddressAndFare = (place) => getSelectedAddressAndFare(place);

  return (
    <GooglePlacesAutocomplete
      placeholder="Destination"
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data, details);
        this.handleGetSelectedAddressAndFare(
          details.geometry.location
          // latitude: details.geometry.location.lat,
          // longitude: details.geometry.location.lng,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        );
      }}
      query={{
        key: "AIzaSyCNFJ91ksP57SweEz_mDgDXAewlJMlr2RI",
        language: "en",
        components: "country:pk",
      }}
      renderLeftButton={() => (
        <FontAwesome name="search" size={30} color="red" />
      )}
      styles={{
        container: {
          flex: 0,
          position: "absolute",
          width: "100%",
          zIndex: 1,
        },
        textInputContainer: {
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          opacity: 0.9,
          borderRadius: 7,
        },
        listView: { backgroundColor: "white" },
      }}
    />
  );
};

export default SearchBox;
