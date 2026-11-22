
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookingSuccessScreen() {
  const router = useRouter();

  const { worker, service, date, time, price } =
    useLocalSearchParams<{
      worker: string;
      service: string;
      date: string;
      time: string;
      price: string;
    }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.successIcon}>✓</Text>

        <Text style={styles.title}>Booking Submitted!</Text>

        <Text style={styles.subtitle}>
          Your service request has been prepared successfully.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Professional</Text>
          <Text style={styles.value}>{worker}</Text>

          <Text style={styles.label}>Service</Text>
          <Text style={styles.value}>{service}</Text>

          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date}</Text>

          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{time}</Text>

          <Text style={styles.label}>Estimated Price</Text>
          <Text style={styles.price}>₹{price}</Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => router.replace('/(tabs)/bookings')}
        >
          <Text style={styles.buttonText}>View My Bookings</Text>
        </Pressable>

        <Pressable onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.homeButton}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F5',
    justifyContent: 'center',
  },
  content: {
    padding: 22,
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DDF2E3',
    color: '#245C42',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#245C42',
    marginTop: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginTop: 8,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 28,
    elevation: 2,
  },
  label: {
    color: '#888',
    fontSize: 13,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  price: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#245C42',
    marginTop: 4,
  },
  button: {
    width: '100%',
    backgroundColor: '#245C42',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    color: '#245C42',
    fontWeight: '600',
    marginTop: 20,
  },
});
