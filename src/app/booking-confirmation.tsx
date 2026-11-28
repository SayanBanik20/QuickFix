import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { workers } from "../data/workers";
import { saveBooking } from "../utils/bookingsStorage";

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const { workerId, service, date, time, address, latitude, longitude } =
    useLocalSearchParams<{
      workerId: string;
      service: string;
      date: string;
      time: string;
      address: string;
      latitude: string;
      longitude: string;
    }>();

  const worker = workers.find((w) => w.id === workerId);

  const handleConfirmBooking = async () => {
    if (saving) return;

    if (!worker) {
      Alert.alert("Error", "Worker information could not be found.");
      return;
    }

    setSaving(true);

    try {
      const newBooking = {
        id: Date.now().toString(),
        workerId: worker.id,
        workerName: worker.name,
        service: service || worker.service,
        date: date || "",
        time: time || "",
        price: worker.price,
        address: address || "",
        description: "Scheduled service booking",
        status: "Pending" as const,
        createdAt: new Date().toISOString(),
      };

      await saveBooking(newBooking);

      router.replace({
        pathname: "/booking/success",
        params: {
          worker: worker.name,
          service: newBooking.service,
          date: newBooking.date,
          time: newBooking.time,
          price: String(newBooking.price),
        },
      });
    } catch (error) {
      console.error("Booking save failed:", error);
      Alert.alert(
        "Booking failed",
        "Unable to save your booking. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.heading}>Review your booking</Text>
        <Text style={styles.subtitle}>
          Make sure everything looks right before confirming.
        </Text>

        {/* Worker card */}
        <View style={styles.workerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {worker?.name?.charAt(0) ?? "W"}
            </Text>
          </View>

          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>
              {worker?.name ?? "Selected professional"}
            </Text>
            <Text style={styles.workerService}>
              {service || worker?.service}
            </Text>
            <Text style={styles.rating}>
              ⭐ {worker?.rating ?? "New"} · {worker?.jobs ?? 0} jobs completed
            </Text>
          </View>
        </View>

        {/* Schedule */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📅 Schedule</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{date || "Not selected"}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{time || "Not selected"}</Text>
          </View>
        </View>

        {/* Service location */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📍 Service location</Text>
          <Text style={styles.address}>{address || "No address selected"}</Text>

          <Text style={styles.coords}>
            {latitude}, {longitude}
          </Text>
        </View>

        {/* Price */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💰 Price estimate</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service charge</Text>
            <Text style={styles.detailValue}>₹{worker?.price ?? 0}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Booking fee</Text>
            <Text style={styles.detailValue}>₹0</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Estimated total</Text>
            <Text style={styles.totalPrice}>₹{worker?.price ?? 0}</Text>
          </View>
        </View>

        {/* Note */}
        <Text style={styles.note}>
          Final charges may vary depending on the work required.
        </Text>
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.bottomLabel}>Estimated total</Text>
          <Text style={styles.bottomPrice}>₹{worker?.price ?? 0}</Text>
        </View>

        <Pressable
          style={[styles.confirmButton, saving && styles.confirmButtonDisabled]}
          onPress={handleConfirmBooking}
          disabled={saving}
        >
          <Text style={styles.confirmButtonText}>
            {saving ? "Saving booking..." : "Confirm booking →"}
          </Text>
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

  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },

  heading: {
    fontSize: 25,
    fontWeight: "800",
    color: "#245C42",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
    marginBottom: 22,
  },

  workerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF3ED",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#245C42",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  workerInfo: {
    flex: 1,
    marginLeft: 14,
  },

  workerName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#245C42",
  },

  workerService: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },

  rating: {
    fontSize: 12,
    color: "#6C7A70",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#245C42",
    marginBottom: 14,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  detailLabel: {
    color: "#777",
    fontSize: 13,
  },

  detailValue: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
  },

  address: {
    color: "#333",
    fontSize: 14,
    lineHeight: 21,
  },

  coords: {
    color: "#999",
    fontSize: 11,
    marginTop: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 16,
    marginBottom: 8,
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },

  totalPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#245C42",
  },

  note: {
    fontSize: 12,
    color: "#888",
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 10,
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  bottomLabel: {
    fontSize: 11,
    color: "#777",
  },

  bottomPrice: {
    fontSize: 22,
    fontWeight: "800",
    color: "#245C42",
    marginTop: 2,
  },

  confirmButton: {
    backgroundColor: "#245C42",
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 14,
  },

  confirmButtonDisabled: {
    opacity: 0.6,
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
