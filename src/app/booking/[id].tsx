import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { workers } from "@/data/workers";
import { useState } from "react";
import { saveBooking } from '@/utils/bookingsStorage';
export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const worker = workers.find((item) => item.id === id);

  if (!worker) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Worker not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>← Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backButton}>← Back</Text>
          </Pressable>

          <Text style={styles.heading}>Book a Service</Text>
          <Text style={styles.subtitle}>
            Complete the details to request your service.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Selected Professional</Text>

          <View style={styles.workerRow}>
            <Image source={{ uri: worker.image }} style={styles.workerImage} />

            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{worker.name}</Text>
              <Text style={styles.service}>{worker.service}</Text>
              <Text style={styles.rating}>⭐ {worker.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Service Location</Text>

          <TextInput
            placeholder="Enter your full address"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.sectionTitle}>Preferred Date</Text>

          <TextInput
            placeholder="DD/MM/YYYY"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.sectionTitle}>Preferred Time</Text>

          <TextInput
            placeholder="Example: 10:00 AM"
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />

          <Text style={styles.sectionTitle}>Describe Your Problem</Text>

          <TextInput
            placeholder="Explain what service you need..."
            style={[styles.input, styles.description]}
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.sectionTitle}>Estimated Price</Text>

          <Text style={styles.price}>₹{worker.price}</Text>

          <Text style={styles.note}>
            Final price may change depending on the work required.
          </Text>
        </View>

        
<Pressable
  style={styles.confirmButton}
  onPress={async () => {
    if (
      !address.trim() ||
      !date.trim() ||
      !time.trim() ||
      !description.trim()
    ) {
      alert("Please fill in all booking details.");
      return;
    }

    try {
      const newBooking = {
        id: Date.now().toString(),
        workerId: worker.id,
        workerName: worker.name,
        service: worker.service,
        date,
        time,
        price: worker.price,
        address,
        description,
        status: 'Pending' as const,
        createdAt: new Date().toISOString(),
      };

      await saveBooking(newBooking);

      router.push({
        pathname: "/booking/success",
        params: {
          worker: worker.name,
          service: worker.service,
          date,
          time,
          price: String(worker.price),
        },
      });
    } catch (error) {
      alert("Failed to save booking. Please try again.");
      console.error(error);
    }
  }}
>
  <Text style={styles.confirmButtonText}>Confirm Booking</Text>
</Pressable>

      </ScrollView>
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
  backButton: {
    color: "#245C42",
    fontSize: 16,
    fontWeight: "600",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#245C42",
    marginTop: 18,
  },
  subtitle: {
    color: "#777",
    marginTop: 7,
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  workerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  workerImage: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  workerInfo: {
    marginLeft: 14,
  },
  workerName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  service: {
    color: "#777",
    marginTop: 4,
  },
  rating: {
    marginTop: 4,
  },
  input: {
    backgroundColor: "#F7F8F5",
    borderWidth: 1,
    borderColor: "#E5E7E2",
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
    marginBottom: 20,
  },
  description: {
    height: 100,
  },
  priceCard: {
    backgroundColor: "#E8F1E9",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#245C42",
  },
  note: {
    fontSize: 12,
    color: "#777",
    marginTop: 7,
  },
  confirmButton: {
    backgroundColor: "#245C42",
    margin: 20,
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
