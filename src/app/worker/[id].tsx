
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { workers } from '@/data/workers';

export default function WorkerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const worker = workers.find((item) => item.id === id);

  if (!worker) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Worker not found.</Text>
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

          <Text style={styles.headerTitle}>Worker Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{ uri: worker.image }}
            style={styles.profileImage}
          />

          <Text style={styles.workerName}>{worker.name}</Text>

          <Text style={styles.service}>{worker.service}</Text>

          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>
              ✓ Verified Professional
            </Text>
          </View>

          <Text style={styles.rating}>
            ⭐ {worker.rating} Rating
          </Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{worker.jobs}</Text>
            <Text style={styles.statLabel}>Jobs Completed</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {worker.experience}
            </Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Starting Price</Text>
          <Text style={styles.price}>₹{worker.price}</Text>
        </View>

        <Pressable
          style={styles.bookButton}
          onPress={() =>
  router.push({
    pathname: '/booking/[id]',
    params: { id: worker.id },
  })
}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F5',
  },
  header: {
    padding: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#245C42',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#245C42',
    marginTop: 18,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 2,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#EAEAEA',
  },
  workerName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 15,
  },
  service: {
    fontSize: 15,
    color: '#777',
    marginTop: 5,
  },
  verifiedBadge: {
    backgroundColor: '#E4F3E8',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
  },
  verifiedText: {
    color: '#245C42',
    fontWeight: '600',
    fontSize: 13,
  },
  rating: {
    fontSize: 16,
    marginTop: 14,
    color: '#444',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 22,
    borderRadius: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#245C42',
  },
  statLabel: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: '#DDD',
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
  },
  priceLabel: {
    color: '#777',
    fontSize: 14,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#245C42',
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: '#245C42',
    margin: 20,
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  notFound: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
