
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Booking = {
  id: string;
  workerId: string;
  workerName: string;
  service: string;
  date: string;
  time: string;
  price: number;
  address: string;
  description: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
};

const BOOKINGS_KEY = 'quickfix_bookings';

// Get all saved bookings
export const getBookings = async (): Promise<Booking[]> => {
  try {
    const data = await AsyncStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading bookings:', error);
    return [];
  }
};

// Save a new booking
export const saveBooking = async (booking: Booking): Promise<void> => {
  try {
    const existingBookings = await getBookings();

    const updatedBookings = [booking, ...existingBookings];

    await AsyncStorage.setItem(
      BOOKINGS_KEY,
      JSON.stringify(updatedBookings)
    );
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

// Delete a booking
export const deleteBooking = async (bookingId: string): Promise<void> => {
  try {
    const existingBookings = await getBookings();

    const updatedBookings = existingBookings.filter(
      (booking) => booking.id !== bookingId
    );

    await AsyncStorage.setItem(
      BOOKINGS_KEY,
      JSON.stringify(updatedBookings)
    );
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
// Update the status of an existing booking
export const updateBookingStatus = async (
  bookingId: string,
  newStatus: Booking['status']
): Promise<void> => {
  try {
    const bookings = await getBookings();

    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status: newStatus }
        : booking
    );

    await AsyncStorage.setItem(
      BOOKINGS_KEY,
      JSON.stringify(updatedBookings)
    );
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};