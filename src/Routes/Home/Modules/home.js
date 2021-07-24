import update from "react-addons-update";
import { Dimensions } from "react-native";
import * as Location from "expo-location";

import constants from "./actionConstants";
import { GOOGLE_MAPS_APIKEY } from "../../../Utilities/googleMapKey";
import request from "../../../Utilities/request";
import calculateFare from "../../../Utilities/fareCalculator";

//--------------------
//Constants
//--------------------
const {
  GET_CURRENT_LOCATION,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX,
  GET_FARE,
} = constants;

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

//GET SELECTED ADDRESS
export const getSelectedAddressAndFare = (payload) => {
  const dummyNumbers = {
    baseFare: 0.4,
    timeRate: 0.14,
    distanceRate: 0.97,
    surcharge: 1,
  };

  return (dispatch, store) => {
    dispatch({
      type: GET_SELECTED_ADDRESS,
      payload,
    });

    //Get the distance and time
    request
      .get("https://maps.googleapis.com/maps/api/distancematrix/json")
      .query({
        origins:
          store().home.region.latitude + "," + store().home.region.longitude,
        destinations:
          store().home.selectedAddress.lat +
          "," +
          store().home.selectedAddress.lng,
        mode: "driving",
        key: GOOGLE_MAPS_APIKEY,
      })
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_DISTANCE_MATRIX,
          payload: response.body,
        });
      })
      .catch((error) => console.log(error.message));

    //Calculating Fare
    setTimeout(() => {
      const fare = calculateFare(
        dummyNumbers.baseFare,
        dummyNumbers.timeRate,
        store().home.distanceMatrix.rows[0].elements[0].duration.value,
        dummyNumbers.distanceRate,
        store().home.distanceMatrix.rows[0].elements[0].distance.value,
        dummyNumbers.surcharge
      );
      dispatch({
        type: GET_FARE,
        payload: fare,
      });
    }, 2000);
  };
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

const handleGetSelectedAddress = (state, action) =>
  update(state, {
    selectedAddress: {
      $set: action.payload,
    },
  });

const handleGetDitanceMatrix = (state, action) =>
  update(state, {
    distanceMatrix: {
      $set: action.payload,
    },
  });

const handleGetFare = (state, action) =>
  update(state, {
    fare: {
      $set: action.payload,
    },
  });

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDitanceMatrix,
  GET_FARE: handleGetFare,
};

const initialState = {
  region: {},
  selectedAddress: {},
};

export const HomeReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
