import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.username}>Hi, Suravi</Text>

            <Text style={styles.location}>📍 West Bengal, Kolkata</Text>
          </View>

          <Pressable style={styles.notification}>
            <Text style={styles.bell}>🔔</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="What service do you need today?"
            placeholderTextColor="#999999"
          />
        </View>

        {/* Promotional Offer */}
        <View style={styles.offerBanner}>
          <View style={styles.offerContent}>
            <Text style={styles.offerLabel}>LIMITED OFFER</Text>

            <Text style={styles.offerTitle}>
              20% off your first
              {"\n"}home service booking
            </Text>

            <Pressable style={styles.claimButton}>
              <Text style={styles.claimText}>Claim offer →</Text>
            </Pressable>
          </View>

          <Text style={styles.offerEmoji}>🏠</Text>
        </View>
        {/* Booking Options */}
<View style={styles.bookingSection}>
  <Text style={styles.bookingSectionTitle}>How would you like to book?</Text>

  <View style={styles.bookingOptions}>
    {/* Instant Booking */}
    <Pressable
  style={styles.instantCard}
  onPress={() => router.push("/instant-booking")}
>
      <Text style={styles.bookingIcon}>⚡</Text>
      <Text style={styles.instantTitle}>Book in</Text>
      <Text style={styles.instantTitle}>10 mins</Text>
      <Text style={styles.instantSubtitle}>Nearest worker assigned</Text>
      <Text style={styles.bookingArrow}>→</Text>
    </Pressable>

    {/* Scheduled Booking */}
    <Pressable
  style={styles.scheduleCard}
  onPress={() => router.push('/schedule-booking')}
>
      <Text style={styles.bookingIcon}>📅</Text>
      <Text style={styles.scheduleTitle}>Schedule</Text>
      <Text style={styles.scheduleTitle}>for later</Text>
      <Text style={styles.scheduleSubtitle}>Choose date & time</Text>
      <Text style={styles.bookingArrowGreen}>→</Text>
    </Pressable>
  </View>
</View>
        {/* Services Section */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all →</Text>
            </Pressable>
          </View>

          <View style={styles.servicesGrid}>
            {[
              { name: "Electrician", icon: "⚡", color: "#EAF5EF" },
              { name: "Plumber", icon: "🚰", color: "#EDF2FC" },
              { name: "Carpenter", icon: "🪚", color: "#FFF4E9" },
              { name: "Cleaning", icon: "🧹", color: "#F8EFF8" },
              { name: "Painting", icon: "🖌️", color: "#FCEFF0" },
              { name: "Appliance", icon: "🔧", color: "#EAF7EF" },
            ].map((service) => (
              <Pressable
                key={service.name}
                style={[styles.serviceCard, { backgroundColor: service.color }]}
                onPress={() =>
                  router.push({
                    pathname: "/service/[name]",
                    params: { name: service.name },
                  })
                }
              >
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceName}>{service.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Nearby Verified Workers
        <View style={styles.workersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Verified Workers</Text>

            <Pressable>
              <Text style={styles.seeAll}>See all →</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.workersList}
          >
            {[
              {
                id: "1",
                name: "Ravi Kumar",
                job: "Electrician",
                rating: "4.9",
                jobs: "142 jobs",
                image: "https://i.pravatar.cc/150?img=12",
              },
              {
                id: "2",
                name: "Priya Singh",
                job: "Cleaner",
                rating: "4.8",
                jobs: "98 jobs",
                image: "https://i.pravatar.cc/150?img=47",
              },
              {
                id: "3",
                name: "Arjun Mehta",
                job: "Plumber",
                rating: "4.7",
                jobs: "85 jobs",
                image: "https://i.pravatar.cc/150?img=13",
              },
            ].map((worker) => (
              <Pressable key={worker.id} style={styles.workerCard}>
                <View style={styles.workerImageContainer}>
                  <Image
                    source={{ uri: worker.image }}
                    style={styles.workerImage}
                  />

                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                </View>

                <Text style={styles.workerName}>{worker.name}</Text>

                <Text style={styles.workerJob}>{worker.job}</Text>

                <Text style={styles.workerRating}>
                  ★ {worker.rating}
                  <Text style={styles.workerJobs}>
                    {" · "}
                    {worker.jobs}
                  </Text>
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F5",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 13,
    color: "#777777",
  },
  username: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#252525",
    marginTop: 3,
  },
  location: {
    fontSize: 12,
    color: "#245C42",
    marginTop: 7,
    fontWeight: "500",
  },
  notification: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  bell: {
    fontSize: 23,
    color: "#245C42",
  },
  searchContainer: {
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 23,
    color: "#777777",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#333333",
  },
  offerBanner: {
    backgroundColor: "#247451",
    borderRadius: 17,
    padding: 17,
    marginTop: 16,
    minHeight: 125,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  offerContent: {
    flex: 1,
  },
  offerLabel: {
    color: "#D6E9DC",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 5,
  },
  offerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
  },
  claimButton: {
    backgroundColor: "#D58A37",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 9,
  },
  claimText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  offerEmoji: {
    fontSize: 43,
    marginHorizontal: 10,
  },

  servicesSection: {
    marginTop: 22,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#252525",
  },
  seeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: "#245C42",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  serviceCard: {
    width: "31.5%",
    height: 88,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  serviceIcon: {
    fontSize: 23,
  },
  serviceName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333333",
  },

  workersSection: {
    marginTop: 24,
    marginBottom: 15,
  },
  workersList: {
    gap: 12,
    paddingVertical: 5,
    paddingRight: 10,
  },
  workerCard: {
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },
  workerImageContainer: {
    position: "relative",
    marginBottom: 9,
  },
  workerImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#E5E5E5",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: -2,
    backgroundColor: "#247451",
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  workerName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#252525",
  },
  workerJob: {
    fontSize: 11,
    color: "#777777",
    marginTop: 4,
  },
  workerRating: {
    fontSize: 11,
    color: "#C08032",
    fontWeight: "bold",
    marginTop: 8,
  },
  workerJobs: {
    color: "#999999",
    fontWeight: "normal",
  },
    // Booking options
  bookingSection: {
    marginTop: 22,
  },
  bookingSectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#252525",
    marginBottom: 12,
  },
  bookingOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  instantCard: {
    width: "48.5%",
    backgroundColor: "#247451",
    borderRadius: 17,
    padding: 14,
    minHeight: 142,
    justifyContent: "center",
    elevation: 2,
  },
  scheduleCard: {
    width: "48.5%",
    backgroundColor: "#EAF5EF",
    borderRadius: 17,
    padding: 14,
    minHeight: 142,
    justifyContent: "center",
    elevation: 2,
  },
  bookingIcon: {
    fontSize: 21,
    marginBottom: 8,
  },
  instantTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#245C42",
  },
  instantSubtitle: {
    fontSize: 10,
    color: "#E2F0E7",
    marginTop: 6,
    lineHeight: 14,
  },
  scheduleSubtitle: {
    fontSize: 10,
    color: "#547360",
    marginTop: 6,
    lineHeight: 14,
  },
  bookingArrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    position: "absolute",
    right: 12,
    bottom: 12,
  },
  bookingArrowGreen: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#245C42",
    position: "absolute",
    right: 12,
    bottom: 12,
  },
});
