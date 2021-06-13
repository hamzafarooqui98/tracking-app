import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import * as Location from "expo-location";

//--------------------
//Constants
//--------------------
const { GET_CURRENT_LOCATION } = constants;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//--------------------
//Actions
//--------------------
const verifyPermissions = async () => {
  const result = await Location.requestForegroundPermissionsAsync();
  if (result.status !== "granted") {
    Alert.alert(
      "Insufficient permissions!",
      "You need to grant location permissions to use this app.",
      [{ text: "Okay" }]
    );
    return false;
  }
  return true;
};

export const getCurrentLocation = () => async (dispatch) => {
  const hasPermission = await verifyPermissions();
  if (!hasPermission) {
    return;
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      timeout: 5000,
    });
    dispatch({
      type: GET_CURRENT_LOCATION,
      payload: location,
    });
  } catch (err) {
    return Alert.alert(
      "Could not fetch location!",
      "Please try again later or pick a location on the map.",
      [{ text: "Okay" }]
    );
  }
};

//--------------------
//Action Handlers
//--------------------
const handleGetCurrentLocation = (state, action) =>
  update(state, {
    region: {
      latitude: {
        $set: action.payload.coords.latitude,
      },
      longitude: {
        $set: action.payload.coords.longitude,
      },
      latitudeDelta: {
        $set: LATITUDE_DELTA,
      },
      longitudeDelta: {
        $set: LONGITUDE_DELTA,
      },
    },
  });

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
};

const initialState = {
  region: {},
};

export const HomeReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
