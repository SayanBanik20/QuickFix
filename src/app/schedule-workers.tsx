import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { workers } from "@/data/workers";

export default function ScheduleWorkersScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  // Applied filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState<"none" | "low" | "high">("none");

  // Temporary filter selections inside the popup
  const [draftCategory, setDraftCategory] = useState("All");
  const [draftRating, setDraftRating] = useState(0);
  const [draftSort, setDraftSort] = useState<"none" | "low" | "high">("none");
  const filteredWorkers = workers
    .filter((worker) => {
      const matchesSearch =
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.service.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || worker.service === selectedCategory;

      const matchesRating = worker.rating >= minRating;

      return matchesSearch && matchesCategory && matchesRating;
    })
    .sort((a, b) => {
      if (sortOrder === "low") {
        return a.price - b.price;
      }

      if (sortOrder === "high") {
        return b.price - a.price;
      }

      return 0;
    });
    const openFilters = () => {
  setDraftCategory(selectedCategory);
  setDraftRating(minRating);
  setDraftSort(sortOrder);
  setFilterVisible(true);
};

const applyFilters = () => {
  setSelectedCategory(draftCategory);
  setMinRating(draftRating);
  setSortOrder(draftSort);
  setFilterVisible(false);
};

const resetFilters = () => {
  setDraftCategory('All');
  setDraftRating(0);
  setDraftSort('none');

  setSelectedCategory('All');
  setMinRating(0);
  setSortOrder('none');
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>← Back</Text>
          </Pressable>

          <Text style={styles.title}>Choose a professional</Text>
          <Text style={styles.subtitle}>
            Find the right expert for your needs
          </Text>
        </View>

        {/* Search & Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>⌕</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search services or professionals"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />

            {search.length > 0 && (
              <Pressable onPress={() => setSearch("")}>
                <Text style={styles.clearSearch}>✕</Text>
              </Pressable>
            )}
          </View>

          <Pressable
            style={styles.filterButton}
            onPress={openFilters}
          >
            <Text style={styles.filterIcon}>☷</Text>
            <Text style={styles.filterButtonText}>Filter</Text>
          </Pressable>
        </View>

        {/* Worker count */}
        <Text style={styles.resultText}>
          {filteredWorkers.length} professionals found
        </Text>

        {/* Worker list */}
        {filteredWorkers.map((worker) => (
          <Pressable
            key={worker.id}
            style={styles.workerCard}
            onPress={() =>
              router.push({
                pathname: "/worker/[id]",
                params: { id: worker.id },
              })
            }
          >
            <Image source={{ uri: worker.image }} style={styles.workerImage} />

            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{worker.name}</Text>

              <Text style={styles.service}>{worker.service}</Text>

              <Text style={styles.rating}>
                ⭐ {worker.rating} · {worker.jobs} jobs
              </Text>

              <Text style={styles.experience}>
                {worker.experience} years experience
              </Text>

              <Text style={styles.price}>Starting ₹{worker.price}</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        {/* Empty search result */}
        {filteredWorkers.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No professionals found.</Text>
            <Text style={styles.emptySubtext}>
              Try searching for another name or service.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Temporary Filter Modal */}
      {/* Filter Modal */}
<Modal
  visible={filterVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setFilterVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalCard}>

      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Filters</Text>

        <Pressable onPress={() => setFilterVisible(false)}>
          <Text style={styles.modalClose}>✕</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Service Category */}
        <Text style={styles.filterSectionTitle}>Service category</Text>

        <View style={styles.optionContainer}>
          {[
            'All',
            'Electrician',
            'Plumber',
            'Carpenter',
            'Cleaning',
            'Painting',
            'Appliance',
          ].map((category) => (
            <Pressable
              key={category}
              style={[
                styles.filterOption,
                draftCategory === category && styles.selectedOption,
              ]}
              onPress={() => setDraftCategory(category)}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  draftCategory === category && styles.selectedOptionText,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Minimum Rating */}
        <Text style={styles.filterSectionTitle}>Minimum rating</Text>

        <View style={styles.optionContainer}>
          {[
            { label: 'Any', value: 0 },
            { label: '4.0+', value: 4.0 },
            { label: '4.5+', value: 4.5 },
            { label: '4.8+', value: 4.8 },
          ].map((rating) => (
            <Pressable
              key={rating.value}
              style={[
                styles.filterOption,
                draftRating === rating.value && styles.selectedOption,
              ]}
              onPress={() => setDraftRating(rating.value)}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  draftRating === rating.value && styles.selectedOptionText,
                ]}
              >
                {rating.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Price Sorting */}
        <Text style={styles.filterSectionTitle}>Sort by price</Text>

        <View style={styles.optionContainer}>
          {[
            { label: 'Recommended', value: 'none' as const },
            { label: 'Low to high', value: 'low' as const },
            { label: 'High to low', value: 'high' as const },
          ].map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.filterOption,
                draftSort === option.value && styles.selectedOption,
              ]}
              onPress={() => setDraftSort(option.value)}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  draftSort === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>

      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.modalFooter}>
        <Pressable
          style={styles.resetButton}
          onPress={resetFilters}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </Pressable>

        <Pressable
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </Pressable>
      </View>

    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F5",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },

  back: {
    color: "#245C42",
    fontSize: 16,
    fontWeight: "600",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#245C42",
    marginTop: 22,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },

  /* Search row */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 22,
    gap: 10,
  },

  searchContainer: {
    flex: 1,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E8EAE5",
  },

  searchIcon: {
    fontSize: 20,
    color: "#777",
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#222",
    paddingVertical: 0,
  },

  clearSearch: {
    fontSize: 17,
    color: "#888",
    paddingLeft: 8,
  },

  /* Filter button */
  filterButton: {
    height: 54,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F0E9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D5E4D7",
    gap: 7,
  },

  filterIcon: {
    fontSize: 19,
    color: "#245C42",
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#245C42",
  },

  /* Results */
  resultText: {
    marginHorizontal: 22,
    marginTop: 22,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  /* Worker cards */
  workerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 14,
    borderRadius: 18,
    elevation: 2,
  },

  workerImage: {
    width: 75,
    height: 75,
    borderRadius: 15,
    backgroundColor: "#EAEAEA",
  },

  workerInfo: {
    flex: 1,
    marginLeft: 14,
  },

  workerName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  service: {
    fontSize: 13,
    color: "#245C42",
    marginTop: 3,
  },

  rating: {
    fontSize: 12,
    color: "#666",
    marginTop: 7,
  },

  experience: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#245C42",
    marginTop: 7,
  },

  arrow: {
    fontSize: 28,
    color: "#999",
    marginLeft: 5,
  },

  /* Empty state */
  emptyContainer: {
    alignItems: "center",
    padding: 40,
  },

  emptyText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#444",
  },

  emptySubtext: {
    fontSize: 13,
    color: "#888",
    marginTop: 8,
    textAlign: "center",
  },

  /* Filter modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#F8F8F5",
    padding: 24,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#245C42",
  },

  modalSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 12,
  },

  closeButton: {
    backgroundColor: "#245C42",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 10,
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},

modalClose: {
  fontSize: 22,
  color: '#777',
  padding: 5,
},

filterSectionTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#245C42',
  marginTop: 18,
  marginBottom: 12,
},

optionContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 9,
},

filterOption: {
  paddingHorizontal: 15,
  paddingVertical: 11,
  borderRadius: 12,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E1E5DF',
},

selectedOption: {
  backgroundColor: '#E4F3E8',
  borderColor: '#245C42',
},

filterOptionText: {
  fontSize: 13,
  color: '#555',
  fontWeight: '500',
},

selectedOptionText: {
  color: '#245C42',
  fontWeight: '700',
},

modalFooter: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 20,
  paddingTop: 15,
  borderTopWidth: 1,
  borderTopColor: '#E5E5E0',
},

resetButton: {
  flex: 1,
  padding: 15,
  borderRadius: 13,
  borderWidth: 1,
  borderColor: '#245C42',
  alignItems: 'center',
},

resetButtonText: {
  color: '#245C42',
  fontWeight: '700',
},

applyButton: {
  flex: 1.5,
  padding: 15,
  borderRadius: 13,
  backgroundColor: '#245C42',
  alignItems: 'center',
},

applyButtonText: {
  color: '#FFFFFF',
  fontWeight: '700',
},
});
