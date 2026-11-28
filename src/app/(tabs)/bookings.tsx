
import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import {
  getBookings,
  updateBookingStatus,
  Booking,
} from '@/utils/bookingsStorage';

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
const [activeFilter, setActiveFilter] = useState<
  'Upcoming' | 'Completed' | 'Cancelled'
>('Upcoming');
  const loadBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadData = async () => {
        try {
          const data = await getBookings();
          if (active) setBookings(data);
        } catch (error) {
          console.error('Failed to load bookings:', error);
        } finally {
          if (active) setLoading(false);
        }
      };

      loadData();

      return () => {
        active = false;
      };
    }, [])
  );
const filteredBookings = bookings.filter((booking) => {
  if (activeFilter === 'Upcoming') {
    return booking.status === 'Pending' || booking.status === 'Confirmed';
  }

  if (activeFilter === 'Completed') {
    return booking.status === 'Completed';
  }

  if (activeFilter === 'Cancelled') {
    return booking.status === 'Cancelled';
  }

  return true;
});
  const handleCancelBooking = (booking: Booking) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your ${booking.service} booking?`,
      [
        {
          text: 'No, Keep It',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await updateBookingStatus(booking.id, 'Cancelled');
              await loadBookings();
              Alert.alert('Booking Cancelled', 'Your booking has been cancelled.');
            } catch (error) {
              Alert.alert('Error', 'Could not cancel booking. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>
          Track your service requests and bookings here.
        </Text>
      <View style={styles.filterContainer}>
  {(['Upcoming', 'Completed', 'Cancelled'] as const).map((filter) => (
    <Pressable
      key={filter}
      style={[
        styles.filterButton,
        activeFilter === filter && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === filter && styles.activeFilterButtonText,
        ]}
      >
        {filter}
      </Text>
    </Pressable>
  ))}
</View>
        {loading ? (
          <Text style={styles.message}>Loading bookings...</Text>
        ) : filteredBookings.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyText}>
              Your booked services will appear here once you book a professional.
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View style={styles.headerInfo}>
                  <Text style={styles.service}>{booking.service}</Text>
                  <Text style={styles.worker}>{booking.workerName}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    booking.status === 'Cancelled' && styles.cancelledBadge,
                    booking.status === 'Completed' && styles.completedBadge,
                    booking.status === 'Confirmed' && styles.confirmedBadge,
                  ]}
                >
                  <Text style={styles.statusText}>{booking.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>📅 Date</Text>
                <Text style={styles.detailValue}>{booking.date}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>🕒 Time</Text>
                <Text style={styles.detailValue}>{booking.time}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>📍 Address</Text>
                <Text style={styles.detailValue}>{booking.address}</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Estimated Price</Text>
                <Text style={styles.price}>₹{booking.price}</Text>
              </View>

              {booking.status === 'Pending' && (
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => handleCancelBooking(booking)}
                >
                  <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                </Pressable>
              )}
            </View>
          ))
        )}
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
    paddingBottom: 40,
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
  message: {
    marginTop: 30,
    textAlign: 'center',
    color: '#68766C',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
  },
  emptyEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#245C42',
  },
  emptyText: {
    fontSize: 14,
    color: '#68766C',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  headerInfo: {
    flex: 1,
  },
  service: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#245C42',
  },
  worker: {
    fontSize: 14,
    color: '#68766C',
    marginTop: 5,
  },
  statusBadge: {
    backgroundColor: '#FFF3DD',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cancelledBadge: {
    backgroundColor: '#FCE8E8',
  },
  completedBadge: {
    backgroundColor: '#E1F3E5',
  },
  confirmedBadge: {
    backgroundColor: '#E4EEFF',
  },
  statusText: {
    color: '#946200',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEDE7',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  detailLabel: {
    color: '#68766C',
    fontSize: 14,
  },
  detailValue: {
    color: '#26352C',
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
    textAlign: 'right',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F6EF',
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  priceLabel: {
    color: '#245C42',
    fontWeight: '600',
  },
  price: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#245C42',
  },
  cancelButton: {
    marginTop: 16,
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9534F',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#D9534F',
    fontSize: 14,
    fontWeight: '600',
  },
    filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E9E1',
  },

  activeFilterButton: {
    backgroundColor: '#245C42',
    borderColor: '#245C42',
  },

  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#68766C',
  },

  activeFilterButtonText: {
    color: '#FFFFFF',
  },
});