import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./searchBoxStyles";

const SearchBox = () => {
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <FontAwesome name="search" size={24} color="red" />
          <Input
            style={styles.inputSearch}
            placeholder="Choose pick-up location"
          />
        </InputGroup>
      </View>

      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP-OFF</Text>
        <InputGroup>
          <FontAwesome name="search" size={24} color="red" />
          <Input
            style={styles.inputSearch}
            placeholder="Choose drop-off location"
          />
        </InputGroup>
      </View>
    </View>
  );
};

export default SearchBox;
