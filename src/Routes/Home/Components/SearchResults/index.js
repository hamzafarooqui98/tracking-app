import React from "react";
import { Text } from "react-native";
import { View, List, ListItem, Left, Body } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./searchResultsStyles";

const SearchResults = ({ predictions }) => {
  return (
    <View style={styles.searchResultsWrapper}>
      <List
        dataArray={predictions}
        renderRow={(item) => (
          <View>
            <ListItem button avatar>
              <Left style={styles.leftContainer}>
                <MaterialIcons name="location-pin" size={20} color="black" />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{item.primaryText}</Text>
                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </Body>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
};

export default SearchResults;
