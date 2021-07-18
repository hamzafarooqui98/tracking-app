import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./searchBoxStyles";

const SearchBox = ({
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
}) => {
  function handleInput(key, val) {
    getInputData({
      key,
      value: val,
    });
    // getAddressPredictions();
  }

  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <FontAwesome name="search" size={15} color="red" />
          <Input
            style={styles.inputSearch}
            placeholder="Choose pick-up location"
            onChangeText={handleInput.bind(this, "pickUp")}
            onFocus={() => toggleSearchResultModal("pickUp")}
          />
        </InputGroup>
      </View>

      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP-OFF</Text>
        <InputGroup>
          <FontAwesome name="search" size={15} color="red" />
          <Input
            style={styles.inputSearch}
            placeholder="Choose drop-off location"
            onChangeText={handleInput.bind(this, "dropOff")}
            onFocus={() => toggleSearchResultModal("dropOff")}
          />
        </InputGroup>
      </View>
    </View>
  );
};

export default SearchBox;
