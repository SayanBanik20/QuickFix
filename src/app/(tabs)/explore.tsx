
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Painting',
  'Carpentry',
  'Appliance Repair',
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore Services</Text>
        <Text style={styles.subtitle}>
          Find the right help for your everyday needs.
        </Text>

        <View style={styles.grid}>
          {services.map((service) => (
            <View key={service} style={styles.card}>
              <Text style={styles.serviceName}>{service}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F3',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#245C42',
  },
  subtitle: {
    fontSize: 15,
    color: '#68766C',
    marginTop: 8,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    justifyContent: 'center',
    elevation: 2,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#245C42',
  },
});
