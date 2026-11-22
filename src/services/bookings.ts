
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Booking = {
  id: string;
  workerId: string;
  workerName: string;
  service: string;
  date: string;
  time: string;
  address: string;
  description: string;
  price: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
};

const BOOKINGS_KEY = 'quickfix_bookings';

// Get all saved bookings
export async function getBookings(): Promise<Booking[]> {
  try {
    const data = await AsyncStorage.getItem(BOOKINGS_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as Booking[];
  } catch (error) {
    console.error('Failed to load bookings:', error);
    return [];
  }
}

// Save a new booking
export async function saveBooking(
  booking: Booking
): Promise<void> {
  try {
    const existingBookings = await getBookings();

    const updatedBookings = [
      booking,
      ...existingBookings,
    ];

    await AsyncStorage.setItem(
      BOOKINGS_KEY,
      JSON.stringify(updatedBookings)
    );
  } catch (error) {
    console.error('Failed to save booking:', error);
    throw error;
  }
}
