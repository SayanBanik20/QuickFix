
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const services = [
  { name: 'Electrician', icon: '⚡', color: '#EAF5EF' },
  { name: 'Plumber', icon: '🚰', color: '#EDF2FC' },
  { name: 'Carpenter', icon: '🪚', color: '#FFF4E9' },
  { name: 'Cleaning', icon: '🧹', color: '#F8EFF8' },
  { name: 'Painting', icon: '🖌️', color: '#FCEFF0' },
  { name: 'Appliance Repair', icon: '🔧', color: '#EAF7EF' },
];

export default function InstantBookingScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Back Button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Heading */}
        <Text style={styles.heading}>Need help right now?</Text>
        <Text style={styles.subtitle}>
          Choose a service and we'll find the nearest available professional.
        </Text>

        {/* Service Selection */}
        <Text style={styles.sectionTitle}>Select a service</Text>

        <View style={styles.servicesGrid}>
          {services.map((service) => {
            const isSelected = selectedService === service.name;

            return (
              <Pressable
                key={service.name}
                style={[
                  styles.serviceCard,
                  { backgroundColor: service.color },
                  isSelected && styles.selectedCard,
                ]}
                onPress={() => setSelectedService(service.name)}
              >
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceName}>{service.name}</Text>

                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Location Card */}
        <View style={styles.locationCard}>
          <Text style={styles.locationLabel}>📍 Service location</Text>
          <Text style={styles.locationText}>Kolkata, West Bengal</Text>
          <Text style={styles.locationHint}>
            Worker matching will use your service location.
          </Text>
        </View>

        {/* ETA Card */}
        <View style={styles.etaCard}>
          <Text style={styles.etaIcon}>⚡</Text>
          <View style={styles.etaContent}>
            <Text style={styles.etaTitle}>Fast response</Text>
            <Text style={styles.etaSubtitle}>
              We’ll find the nearest available professional.
            </Text>
          </View>
        </View>

        {/* Find Professional Button */}
        <Pressable
          style={[
            styles.findButton,
            !selectedService && styles.disabledButton,
          ]}
          onPress={() => {
            if (!selectedService) {
              alert('Please select a service first.');
              return;
            }

            router.push({
              pathname: '/instant-search',
              params: { service: selectedService },
            });
          }}
        >
          <Text style={styles.findButtonText}>
            Find a professional  →
          </Text>
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
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 18,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#245C42',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#245C42',
  },
  subtitle: {
    fontSize: 14,
    color: '#68766C',
    marginTop: 8,
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#252525',
    marginTop: 26,
    marginBottom: 14,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  serviceCard: {
    width: '31.5%',
    height: 105,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 7,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#247451',
  },
  serviceIcon: {
    fontSize: 27,
  },
  serviceName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#247451',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    elevation: 1,
  },
  locationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#68766C',
  },
  locationText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#245C42',
    marginTop: 8,
  },
  locationHint: {
    fontSize: 12,
    color: '#87918A',
    marginTop: 5,
  },
  etaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF5EF',
    borderRadius: 16,
    padding: 15,
    marginTop: 14,
    gap: 12,
  },
  etaIcon: {
    fontSize: 27,
  },
  etaContent: {
    flex: 1,
  },
  etaTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#245C42',
  },
  etaSubtitle: {
    fontSize: 12,
    color: '#547360',
    marginTop: 4,
  },
  findButton: {
    backgroundColor: '#247451',
    borderRadius: 15,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.55,
  },
  findButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
