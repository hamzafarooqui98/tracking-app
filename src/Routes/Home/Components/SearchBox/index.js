import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import styles from "./searchBoxStyles";

const SearchBox = ({
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getSelectedAddress,
}) => {
  function handleInput(key, val) {
    getInputData({
      key,
      value: val,
    });
    // getAddressPredictions();
  }

  const handleGetSelectedAddress = (place) => getSelectedAddress(place);

  return (
    <GooglePlacesAutocomplete
      placeholder="Destination"
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        handleGetSelectedAddress(
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
    // <View style={styles.searchBox}>
    //   <View style={styles.inputWrapper}>
    //     <Text style={styles.label}>PICK UP</Text>
    //     <InputGroup>
    //       <FontAwesome name="search" size={15} color="red" />
    //       <Input
    //         style={styles.inputSearch}
    //         placeholder="Choose pick-up location"
    //         onChangeText={handleInput.bind(this, "pickUp")}
    //         onFocus={() => toggleSearchResultModal("pickUp")}
    //       />
    //     </InputGroup>
    //   </View>

    //   <View style={styles.secondInputWrapper}>
    //     <Text style={styles.label}>DROP-OFF</Text>
    //     <InputGroup>
    //       <FontAwesome name="search" size={15} color="red" />
    //       <Input
    //         style={styles.inputSearch}
    //         placeholder="Choose drop-off location"
    //         onChangeText={handleInput.bind(this, "dropOff")}
    //         onFocus={() => toggleSearchResultModal("dropOff")}
    //       />
    //     </InputGroup>
    //   </View>
    // </View>
  );
};

export default SearchBox;
