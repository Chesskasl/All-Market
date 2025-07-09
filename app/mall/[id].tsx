import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MapPin, Phone, Store, ExternalLink, Info } from "lucide-react-native";
import Colors from "@/constants/colors";
import BoutiqueCard from "@/components/BoutiqueCard";
import CategoryScroll from "@/components/CategoryScroll";
import { malls, boutiques } from "@/constants/mockData";

export default function MallDetailScreen() {
  const { id } = useLocalSearchParams();
  const mallId = Number(id);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const mall = malls.find((m) => m.id === mallId);
  const mallBoutiques = boutiques.filter((b) => b.mallId === mallId);

  const filteredBoutiques = selectedCategory
    ? mallBoutiques.filter((b) => b.category === selectedCategory)
    : mallBoutiques;

  if (!mall) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Mall not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={{ uri: mall.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{mall.name}</Text>
          <View style={styles.infoRow}>
            <MapPin size={16} color={Colors.light.placeholder} />
            <Text style={styles.address}>{mall.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Store size={16} color={Colors.light.placeholder} />
            <Text style={styles.boutiquesCount}>{mall.boutiquesCount} boutiques</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={18} color={Colors.light.primary} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <ExternalLink size={18} color={Colors.light.primary} />
              <Text style={styles.actionText}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setShowMap(!showMap)}
            >
              <MapPin size={18} color={Colors.light.primary} />
              <Text style={styles.actionText}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showMap && (
        <View style={styles.mapContainer}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Mall Map</Text>
            <TouchableOpacity onPress={() => setShowMap(false)}>
              <Info size={18} color={Colors.light.primary} />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: mall.mapImage }} style={styles.mapImage} />
          <Text style={styles.mapNote}>
            Tap on a boutique location on the map to see details
          </Text>
        </View>
      )}

      <View style={styles.filterContainer}>
        <Text style={styles.sectionTitle}>Boutiques</Text>
        <CategoryScroll 
          onSelectCategory={(categoryId) => setSelectedCategory(categoryId === 0 ? null : categoryId)} 
          selectedCategory={selectedCategory} 
        />
      </View>

      <View style={styles.boutiquesContainer}>
        {filteredBoutiques.length > 0 ? (
          filteredBoutiques.map((boutique) => (
            <BoutiqueCard
              key={boutique.id}
              id={boutique.id}
              name={boutique.name}
              category={boutique.category}
              description={boutique.description}
              locationInMall={boutique.locationInMall}
              contactNumber={boutique.contactNumber}
              instagram={boutique.instagram}
              hasDelivery={boutique.hasDelivery}
              photos={boutique.photos}
              featured={boutique.featured}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Boutiques Found</Text>
            <Text style={styles.emptyMessage}>
              There are no boutiques matching your selected category.
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={styles.resetButtonText}>Show All Boutiques</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.light.text,
  },
  header: {
    backgroundColor: Colors.light.card,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: Colors.light.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  address: {
    fontSize: 14,
    color: Colors.light.placeholder,
    flex: 1,
  },
  boutiquesCount: {
    fontSize: 14,
    color: Colors.light.placeholder,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: "rgba(74, 111, 165, 0.1)",
    borderRadius: 8,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  mapContainer: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  mapNote: {
    fontSize: 12,
    color: Colors.light.placeholder,
    marginTop: 8,
    textAlign: "center",
  },
  filterContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: Colors.light.text,
  },
  boutiquesContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.light.text,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.light.placeholder,
    textAlign: "center",
    marginBottom: 20,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
