import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/colors";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  boutiqueId: number;
  boutiqueName: string;
  mallId: number;
  mallName: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  boutiqueId,
  boutiqueName,
  mallId,
  mallName,
}: ProductCardProps) {
  const handlePress = () => {
    router.push(`/boutique/${boutiqueId}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.boutique} numberOfLines={1}>
            {boutiqueName}
          </Text>
          <Text style={styles.mall} numberOfLines={1}>
            {mallName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.primary,
    marginBottom: 6,
  },
  locationContainer: {
    gap: 2,
  },
  boutique: {
    fontSize: 12,
    color: Colors.light.text,
  },
  mall: {
    fontSize: 11,
    color: Colors.light.placeholder,
  },
});
