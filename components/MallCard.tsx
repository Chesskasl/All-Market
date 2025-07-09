import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MapPin, Store } from "lucide-react-native";
import { router } from "expo-router";
import Colors from "@/constants/colors";

interface MallCardProps {
  id: number;
  name: string;
  address: string;
  image: string;
  boutiquesCount: number;
  featured?: boolean;
  compact?: boolean;
}

export default function MallCard({
  id,
  name,
  address,
  image,
  boutiquesCount,
  featured = false,
  compact = false,
}: MallCardProps) {
  const handlePress = () => {
    router.push(`/mall/${id}`);
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={handlePress}>
        <Image source={{ uri: image }} style={styles.compactImage} />
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.compactBoutiques} numberOfLines={1}>
            {boutiquesCount} boutiques
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.image} />
      {featured && <View style={styles.featuredBadge}><Text style={styles.featuredText}>Featured</Text></View>}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.infoRow}>
          <MapPin size={14} color={Colors.light.placeholder} />
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Store size={14} color={Colors.light.placeholder} />
          <Text style={styles.boutiques}>{boutiquesCount} boutiques</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.light.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  address: {
    fontSize: 14,
    color: Colors.light.placeholder,
    flex: 1,
  },
  boutiques: {
    fontSize: 14,
    color: Colors.light.placeholder,
  },
  featuredBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    color: Colors.light.card,
    fontSize: 12,
    fontWeight: "600",
  },
  // Compact styles
  compactContainer: {
    width: 140,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 12,
  },
  compactImage: {
    width: "100%",
    height: 90,
    resizeMode: "cover",
  },
  compactContent: {
    padding: 8,
  },
  compactName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 2,
  },
  compactBoutiques: {
    fontSize: 12,
    color: Colors.light.placeholder,
  },
});
