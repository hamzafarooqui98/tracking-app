import React from "react";
import { Text } from "react-native";
import { View, List, ListItem, Left } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./searchResultsStyles";

const SearchResults = () => {
  return (
    <View>
      <View style={styles.searchResultsWrapper}>
        <List>
          <ListItem button avatar>
            <Left style={styles.leftContainer}>
              <MaterialIcons name="location-pin" size={24} color="black" />
            </Left>
            <Text>List Item 1</Text>
          </ListItem>

          <ListItem>
            <Text>List Item 2</Text>
          </ListItem>
        </List>
      </View>
    </View>
  );
};

export default SearchResults;
