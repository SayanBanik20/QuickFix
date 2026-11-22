
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

export default function ServiceScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const serviceName = name || 'Service';

  const serviceWorkers = workers.filter(
    (worker) =>
      worker.service.toLowerCase() === serviceName.toLowerCase()
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backButton}>← Back</Text>
          </Pressable>

          <Text style={styles.title}>{serviceName}</Text>
          <Text style={styles.subtitle}>
            Find trusted {serviceName.toLowerCase()} professionals near you.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Available Professionals
          </Text>

          <Text style={styles.resultCount}>
            {serviceWorkers.length} professionals found
          </Text>

          {serviceWorkers.map((worker) => (
            <Pressable
  key={worker.id}
  style={styles.workerCard}
  onPress={() =>
    router.push({
      pathname: '/worker/[id]',
      params: { id: worker.id },
    })
  }
>
              <Image
                source={{ uri: worker.image }}
                style={styles.workerImage}
              />

              <View style={styles.workerInfo}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <Text style={styles.workerService}>
                  {worker.service}
                </Text>

                <Text style={styles.rating}>
                  ⭐ {worker.rating} · {worker.jobs} jobs completed
                </Text>

                <Text style={styles.experience}>
                  {worker.experience} years experience
                </Text>

                <Text style={styles.price}>
                  Starting at ₹{worker.price}
                </Text>
              </View>
            </Pressable>
          ))}

          {serviceWorkers.length === 0 && (
            <Text style={styles.emptyText}>
              No professionals found for this service yet.
            </Text>
          )}
        </View>
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
    paddingTop: 15,
  },
  backButton: {
    color: '#245C42',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#245C42',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  resultCount: {
    color: '#777',
    marginTop: 5,
    marginBottom: 15,
  },
  workerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  workerImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#EAEAEA',
  },
  workerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  workerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  workerService: {
    color: '#245C42',
    marginTop: 3,
  },
  rating: {
    fontSize: 12,
    color: '#555',
    marginTop: 6,
  },
  experience: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#245C42',
    marginTop: 7,
  },
  emptyText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 30,
  },
});
