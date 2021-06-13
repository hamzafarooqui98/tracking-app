import { StyleSheet, Dimensions } from "react-native";

// const styles = {
//   container: {
//     // flex: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//     ...StyleSheet.absoluteFillObject,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default styles;
