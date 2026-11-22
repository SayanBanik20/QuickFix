
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>
          Your conversations with service providers will appear here.
        </Text>
      </View>
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
  },
});
