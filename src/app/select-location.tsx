import { useState, useRef } from "react";
import * as Location from "expo-location";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
export default function SelectLocationScreen() {
  const { workerId, service, date, time } = useLocalSearchParams<{
    workerId: string;
    service: string;
    date: string;
    time: string;
  }>();
  const [location, setLocation] = useState({
    latitude: 22.498,
    longitude: 88.368,
  });
  const [address, setAddress] = useState(
    "Move the map to select your location",
  );
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const mapRef = useRef<MapView>(null);
  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ) => {
    try {
      setLoadingAddress(true);

      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result.length > 0) {
        const place = result[0];

        const formattedAddress = [
          place.name,
          place.street,
          place.district,
          place.city,
          place.region,
          place.postalCode,
        ]
          .filter(Boolean)
          .filter((value, index, array) => array.indexOf(value) === index)
          .join(", ");

        setAddress(
          formattedAddress || "Address not available for this location",
        );
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      setAddress("Unable to fetch address");
    } finally {
      setLoadingAddress(false);
    }
  };
  const searchPlace = async () => {
    if (!searchQuery.trim()) {
      Alert.alert(
        "Enter a location",
        "Please enter an area, street, or landmark.",
      );
      return;
    }

    try {
      setSearching(true);

      const results = await Location.geocodeAsync(searchQuery.trim());

      if (results.length === 0) {
        Alert.alert("Location not found", "Try another area or landmark.");
        return;
      }

      const coords = {
        latitude: results[0].latitude,
        longitude: results[0].longitude,
      };

      setLocation(coords);
      await getAddressFromCoordinates(coords.latitude, coords.longitude);

      mapRef.current?.animateToRegion({
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert("Search failed", "Unable to search for this location.");
    } finally {
      setSearching(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onRegionChangeComplete={(region) => {
            const coords = {
              latitude: region.latitude,
              longitude: region.longitude,
            };

            setLocation(coords);
            getAddressFromCoordinates(coords.latitude, coords.longitude);
          }}
        />

        {/* Search overlay */}
        <View style={styles.searchBar}>
          <Pressable onPress={searchPlace}>
            <Text style={{ fontSize: 18, marginRight: 10 }}>🔍</Text>
          </Pressable>

          <TextInput
            placeholder="Search by area, name, street"
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={searchPlace}
          />

          {searching && (
            <Text style={{ color: "#247451", fontSize: 12 }}>Searching...</Text>
          )}
        </View>
      </View>
      <Pressable
        style={styles.currentLocationButton}
        onPress={async () => {
          try {
            const { status } =
              await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
              Alert.alert(
                "Permission denied",
                "Please allow location access to use this feature.",
              );
              return;
            }

            const enabled = await Location.hasServicesEnabledAsync();

            if (!enabled) {
              Alert.alert(
                "Location services disabled",
                "Please turn on your device's location services.",
              );
              return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
            });

            const coords = {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            };

            setLocation(coords);
            getAddressFromCoordinates(coords.latitude, coords.longitude);

            mapRef.current?.animateToRegion({
              ...coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          } catch (error) {
            Alert.alert(
              "Location error",
              "Unable to retrieve your location. Please try again.",
            );
          }
        }}
      >
        <Text style={{ fontSize: 18 }}>📍</Text>
      </Pressable>
      <View style={styles.centerPin} pointerEvents="none">
        <Text style={styles.pinEmoji}>📍</Text>
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.locationTitle}>
          {loadingAddress ? "Finding your address..." : "Service location"}
        </Text>

        <Text style={styles.coordinates} numberOfLines={3}>
          {address}
        </Text>

        <Pressable
          style={styles.confirmButton}
          onPress={async () => {
            const { status } =
              await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
              Alert.alert(
                "Permission denied",
                "Please allow location access to use this feature.",
              );
              return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            const coords = {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            };

            setLocation(coords);
            getAddressFromCoordinates(coords.latitude, coords.longitude);

            mapRef.current?.animateToRegion({
              ...coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }}
        >
          <Text style={styles.confirmText}>Confirm location →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F5",
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#245C42",
  },
  subtitle: {
    fontSize: 13,
    color: "#68766C",
    marginTop: 6,
  },
  map: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
  coordinates: {
    color: "#68766C",
    marginTop: 6,
    fontSize: 13,
  },
  confirmButton: {
    backgroundColor: "#245C42",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 16,
  },
  confirmText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -18,
    marginTop: -36,
    zIndex: 10,
    alignItems: "center",
  },

  pinEmoji: {
    fontSize: 36,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },

  searchBar: {
    position: "absolute",
    top: 15,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
  },

  currentLocationButton: {
    position: "absolute",
    right: 16,
    bottom: 20,
    backgroundColor: "#FFFFFF",
    padding: 13,
    borderRadius: 50,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
