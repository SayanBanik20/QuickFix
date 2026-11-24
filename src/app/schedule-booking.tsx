import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { workers } from "../data/workers";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const services = [
  { name: "Electrician", icon: "⚡", color: "#EAF5EF" },
  { name: "Plumber", icon: "🚰", color: "#EDF2FC" },
  { name: "Carpenter", icon: "🪚", color: "#FFF4E9" },
  { name: "Cleaning", icon: "🧹", color: "#F8EFF8" },
  { name: "Painting", icon: "🖌️", color: "#FCEFF0" },
  { name: "Appliance Repair", icon: "🔧", color: "#EAF7EF" },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

function getNextDays() {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const dateKey = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return {
      key: dateKey,
      day:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  });
}

export default function ScheduleBookingScreen() {
  const router = useRouter();
  const dates = getNextDays();

  const { workerId } = useLocalSearchParams<{ workerId: string }>();

  const selectedWorker = workers.find((worker) => worker.id === workerId);

  const [selectedService, setSelectedService] = useState(
    selectedWorker?.service ?? "",
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceLocation, setServiceLocation] = useState(
    "Kolkata, West Bengal",
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>

          <Text style={styles.heading}>Schedule a service</Text>
          <Text style={styles.subtitle}>
            Choose a convenient date and time for your selected professional.
          </Text>
          {selectedWorker && (
            <View
              style={{
                backgroundColor: "#EAF5EF",
                padding: 16,
                borderRadius: 14,
                marginTop: 20,
                borderWidth: 1,
                borderColor: "#D5E8DC",
              }}
            >
              <Text style={{ fontSize: 12, color: "#68766C" }}>
                YOUR SELECTED PROFESSIONAL
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#245C42",
                  marginTop: 6,
                }}
              >
                {selectedWorker.name}
              </Text>

              <Text style={{ fontSize: 14, color: "#68766C", marginTop: 4 }}>
                {selectedWorker.service} · {selectedWorker.experience} years
                experience
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#245C42",
                  marginTop: 8,
                }}
              >
                ₹{selectedWorker.price}
              </Text>
            </View>
          )}
          {/* Service selection */}
          {!selectedWorker && (
            <>
              <Text style={styles.sectionTitle}>What service do you need?</Text>

              <View style={styles.serviceGrid}>
                {services.map((service) => {
                  const isSelected = selectedService === service.name;

                  return (
                    <Pressable
                      key={service.name}
                      onPress={() => setSelectedService(service.name)}
                      style={[
                        styles.serviceCard,
                        { backgroundColor: service.color },
                        isSelected && styles.selectedService,
                      ]}
                    >
                      <Text style={styles.serviceIcon}>{service.icon}</Text>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      {isSelected && <Text style={styles.check}>✓</Text>}
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          {/* Date selection */}
          <Text style={styles.sectionTitle}>Select a date</Text>

          <View style={styles.dateGrid}>
            {dates.map((item) => {
              const isSelected = selectedDate === item.key;

              return (
                <Pressable
                  key={item.key}
                  onPress={() => setSelectedDate(item.key)}
                  style={[styles.dateCard, isSelected && styles.selectedDate]}
                >
                  <Text
                    style={[styles.dayText, isSelected && styles.selectedText]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[styles.dateText, isSelected && styles.selectedText]}
                  >
                    {item.date}
                  </Text>
                  <Text
                    style={[
                      styles.monthText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {item.month}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Time selection */}
          <Text style={styles.sectionTitle}>Select a time</Text>

          <View style={styles.timeGrid}>
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <Pressable
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={[styles.timeCard, isSelected && styles.selectedTime]}
                >
                  <Text
                    style={[styles.timeText, isSelected && styles.selectedText]}
                  >
                    {time}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Location */}
          {/* Location */}
          <View style={styles.locationCard}>
            <Text style={styles.locationLabel}>📍 Service location</Text>

            <TextInput
              style={styles.locationInput}
              value={serviceLocation}
              onChangeText={setServiceLocation}
              placeholder="Enter your address or landmark"
              placeholderTextColor="#999999"
            />

            <Text style={styles.locationHint}>
              Worker assignment will be based on your location and availability.
            </Text>
          </View>

          {/* Continue */}
          <Pressable
            style={[
              styles.continueButton,
              (!selectedService || !selectedDate || !selectedTime) &&
                styles.disabledButton,
            ]}
            onPress={() => {
              if (!selectedService || !selectedDate || !selectedTime) {
                Alert.alert(
                  "Incomplete booking",
                  "Please select a service, date and time.",
                );
                return;
              }

              router.push({
                pathname: "/select-location",
                params: {
                  workerId: workerId ?? "",
                  service: selectedService,
                  date: selectedDate,
                  time: selectedTime,
                },
              });
            }}
          >
            <Text style={styles.continueText}>Continue →</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F5",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 18,
  },

  backText: {
    color: "#245C42",
    fontSize: 15,
    fontWeight: "600",
  },

  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#245C42",
  },

  subtitle: {
    fontSize: 14,
    color: "#68766C",
    marginTop: 8,
    lineHeight: 21,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#252525",
    marginTop: 26,
    marginBottom: 14,
  },

  // Service selection
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  serviceCard: {
    width: "48%",
    height: 95,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 5,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  selectedService: {
    borderColor: "#247451",
  },

  serviceIcon: {
    fontSize: 24,
  },

  serviceName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
  },

  check: {
    position: "absolute",
    top: 6,
    right: 9,
    color: "#247451",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Date selection
  dateGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },

  dateCard: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7EAE5",
  },

  selectedDate: {
    backgroundColor: "#247451",
    borderColor: "#247451",
  },

  dayText: {
    fontSize: 10,
    color: "#777777",
    fontWeight: "600",
    textAlign: "center",
  },

  dateText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 4,
  },

  monthText: {
    fontSize: 11,
    color: "#777777",
  },

  // Time selection
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },

  timeCard: {
    width: "31.5%",
    minHeight: 46,
    paddingVertical: 11,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E8E3",
  },

  selectedTime: {
    backgroundColor: "#247451",
    borderColor: "#247451",
  },

  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444444",
    textAlign: "center",
  },

  selectedText: {
    color: "#FFFFFF",
  },

  // Location
  locationCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    elevation: 1,
  },

  locationLabel: {
    fontSize: 13,
    color: "#68766C",
    fontWeight: "600",
  },

  locationValue: {
    fontSize: 17,
    color: "#245C42",
    fontWeight: "bold",
    marginTop: 8,
  },

  locationInput: {
    backgroundColor: "#F8F8F5",
    borderWidth: 1,
    borderColor: "#E2E8E2",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#245C42",
    marginTop: 12,
  },

  locationHint: {
    fontSize: 12,
    color: "#87918A",
    marginTop: 8,
    lineHeight: 18,
  },

  // Continue button
  continueButton: {
    backgroundColor: "#247451",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  disabledButton: {
    opacity: 0.6,
  },

  continueText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
