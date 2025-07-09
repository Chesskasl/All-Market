import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { ShoppingBag, Store, User, MapPin } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function ModalScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" }} 
          style={styles.headerImage} 
        />
        <View style={styles.logoContainer}>
          <ShoppingBag size={40} color={Colors.light.primary} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to AllMarket</Text>
        <Text style={styles.subtitle}>
          Your smart marketplace guide connecting buyers and offline sellers in Kazakhstan
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is AllMarket?</Text>
          <Text style={styles.paragraph}>
            AllMarket is a digital bridge between customers and boutique owners in shopping centers and bazaars across Kazakhstan. We help you find exactly what you need without walking through dozens of unknown boutiques.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <User size={24} color={Colors.light.primary} />
            <Text style={styles.featureTitle}>For Buyers</Text>
            <Text style={styles.featureText}>
              Easily search for specific items, browse malls, and explore boutique listings with detailed information.
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Store size={24} color={Colors.light.primary} />
            <Text style={styles.featureTitle}>For Sellers</Text>
            <Text style={styles.featureText}>
              Register your boutique, showcase your products, and increase visibility even if you only operate offline.
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <MapPin size={24} color={Colors.light.primary} />
            <Text style={styles.featureTitle}>Interactive Maps</Text>
            <Text style={styles.featureText}>
              View detailed mall maps to easily locate boutiques and navigate shopping centers.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            We aim to make shopping easier for customers while helping small offline sellers become digitally visible and grow their revenue with minimal tech skills.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            Have questions or suggestions? Reach out to us at support@allmarket.kz or call +7 707 123 4567.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.copyright}>© 2025 AllMarket. All rights reserved.</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    position: "relative",
    height: 200,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logoContainer: {
    position: "absolute",
    bottom: -30,
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.placeholder,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.text,
  },
  featuresContainer: {
    flexDirection: "column",
    marginBottom: 24,
    gap: 16,
  },
  featureCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: Colors.light.placeholder,
    lineHeight: 20,
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
  },
  copyright: {
    fontSize: 12,
    color: Colors.light.placeholder,
    marginBottom: 4,
  },
  version: {
    fontSize: 12,
    color: Colors.light.placeholder,
  },
});
