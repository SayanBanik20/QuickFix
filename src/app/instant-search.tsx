
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function InstantSearchScreen() {
  const router = useRouter();
  const { service } = useLocalSearchParams<{ service: string }>();

  const pulse = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const rotateAnimation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    pulseAnimation.start();
    rotateAnimation.start();

    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
    };
  }, [pulse, rotate]);

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.5],
  });

  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Finding your professional</Text>
        <Text style={styles.subtitle}>
          We're searching nearby for the best available worker.
        </Text>
      </View>

      {/* Searching Animation */}
      <View style={styles.searchArea}>
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [{ scale: ringScale }],
              opacity: ringOpacity,
            },
          ]}
        />

        <View style={styles.outerCircle}>
          <View style={styles.middleCircle}>
            <Animated.View
              style={[
                styles.innerCircle,
                { transform: [{ rotate: rotation }] },
              ]}
            >
              <View style={styles.orbitDot} />
            </Animated.View>

            <View style={styles.centerIcon}>
              <Text style={styles.workerEmoji}>👷</Text>
            </View>
          </View>
        </View>

        <Text style={styles.searchingText}>Searching nearby...</Text>
        <Text style={styles.searchingSubtext}>
          Checking worker availability
        </Text>
      </View>

      {/* Booking Information */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Text>🔧</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>SERVICE</Text>
            <Text style={styles.infoValue}>{service || 'Selected service'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Text>📍</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>LOCATION</Text>
            <Text style={styles.infoValue}>Kolkata, West Bengal</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Text>⚡</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>BOOKING TYPE</Text>
            <Text style={styles.infoValue}>Instant request</Text>
          </View>
        </View>
      </View>

      {/* Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>
          Matching you with the nearest available professional...
        </Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomHint}>
          Please wait while we find someone for you.
        </Text>

        <Pressable
          style={styles.cancelButton}
          onPress={() => router.replace('/instant-booking')}
        >
          <Text style={styles.cancelText}>Cancel Request</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F5',
    paddingHorizontal: 22,
  },
  top: {
    marginTop: 15,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    color: '#245C42',
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#245C42',
  },
  subtitle: {
    color: '#7B877F',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },
  searchArea: {
    flex: 1,
    minHeight: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#A7D7B8',
  },
  outerCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#E2F0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCircle: {
    width: 155,
    height: 155,
    borderRadius: 78,
    backgroundColor: '#C6E3D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#74B88B',
    borderStyle: 'dashed',
  },
  orbitDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#247451',
    position: 'absolute',
    top: 5,
    left: 62,
  },
  centerIcon: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  workerEmoji: {
    fontSize: 42,
  },
  searchingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#245C42',
    marginTop: 25,
  },
  searchingSubtext: {
    color: '#839087',
    fontSize: 13,
    marginTop: 7,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingVertical: 5,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EAF5EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#98A198',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1EE',
    marginVertical: 10,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF5EF',
    borderRadius: 13,
    padding: 14,
    gap: 10,
    marginTop: 15,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#247451',
  },
  statusText: {
    flex: 1,
    fontSize: 12,
    color: '#477157',
    lineHeight: 18,
  },
  bottom: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  bottomHint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#909991',
    marginBottom: 14,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D9DED9',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelText: {
    color: '#555E57',
    fontWeight: '600',
    fontSize: 14,
  },
});
