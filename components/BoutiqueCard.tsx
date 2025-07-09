import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Instagram, MapPin, Phone, Truck } from "lucide-react-native";
import { router } from "expo-router";
import Colors from "@/constants/colors";

interface BoutiqueCardProps {
  id: number;
  name: string;
  category: number;
  description: string;
  locationInMall: string;
  contactNumber: string;
  instagram: string;
  hasDelivery: boolean;
  photos: string[];
  featured?: boolean;
  compact?: boolean;
}

export default function BoutiqueCard({
  id,
  name,
  description,
  locationInMall,
  contactNumber,
  instagram,
  hasDelivery,
  photos,
  featured = false,
  compact = false,
}: BoutiqueCardProps) {
  const handlePress = () => {
    router.push(`/boutique/${id}`);
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={handlePress}>
        <Image source={{ uri: photos[0] }} style={styles.compactImage} />
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.compactDescription} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photos[0] }} style={styles.image} />
        {featured && <View style={styles.featuredBadge}><Text style={styles.featuredText}>Featured</Text></View>}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={Colors.light.placeholder} />
          <Text style={styles.infoText} numberOfLines={1}>
            {locationInMall}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Phone size={14} color={Colors.light.placeholder} />
          <Text style={styles.infoText}>{contactNumber}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Instagram size={14} color={Colors.light.placeholder} />
          <Text style={styles.infoText}>{instagram}</Text>
        </View>
        
        {hasDelivery && (
          <View style={styles.deliveryContainer}>
            <Truck size={14} color={Colors.light.primary} />
            <Text style={styles.deliveryText}>Delivery available</Text>
          </View>
        )}
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
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.placeholder,
    flex: 1,
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(74, 111, 165, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 6,
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.primary,
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
    width: 160,
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
    height: 100,
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
  compactDescription: {
    fontSize: 12,
    color: Colors.light.placeholder,
  },
});
