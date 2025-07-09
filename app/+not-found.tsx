import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Home, ArrowLeft } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found", headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.errorCode}>404</Text>
          </View>
          <Text style={styles.title}>Page Not Found</Text>
          <Text style={styles.message}>
            The page you are looking for doesn't exist or has been moved.
          </Text>
          
          <View style={styles.buttonsContainer}>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Home size={20} color="white" />
                <Text style={styles.primaryButtonText}>Go to Home</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <ArrowLeft size={20} color={Colors.light.primary} />
                <Text style={styles.secondaryButtonText}>Go Back</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(74, 111, 165, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  errorCode: {
    fontSize: 40,
    fontWeight: "700",
    color: Colors.light.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: Colors.light.placeholder,
    textAlign: "center",
    marginBottom: 32,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    gap: 8,
  },
  secondaryButtonText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
