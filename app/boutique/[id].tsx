import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking, FlatList, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MapPin, Phone, Instagram, Truck, Heart, Share2, ExternalLink } from "lucide-react-native";
import Colors from "@/constants/colors";
import { boutiques, malls } from "@/constants/mockData";

const { width } = Dimensions.get("window");

export default function BoutiqueDetailScreen() {
  const { id } = useLocalSearchParams();
  const boutiqueId = Number(id);
  const [isFavorite, setIsFavorite] = useState(false);

  const boutique = boutiques.find((b) => b.id === boutiqueId);
  
  if (!boutique) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Boutique not found</Text>
      </View>
    );
  }

  const mall = malls.find((m) => m.id === boutique.mallId);

  const handleCall = () => {
    Linking.openURL(`tel:${boutique.contactNumber}`);
  };

  const handleInstagram = () => {
    // In a real app, this would open the Instagram profile
    Linking.openURL("https://instagram.com");
  };

  const handleShare = () => {
    // In a real app, this would open the share dialog
    alert("Share functionality would be implemented here");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageGallery}>
        <FlatList
          data={boutique.photos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.galleryImage} />
          )}
        />
        <View style={styles.galleryIndicator}>
          {boutique.photos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                index === 0 && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{boutique.name}</Text>
          <Text style={styles.description}>{boutique.description}</Text>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={[styles.actionButton, isFavorite && styles.favoriteButton]} 
            onPress={toggleFavorite}
          >
            <Heart 
              size={20} 
              color={isFavorite ? "white" : Colors.light.text} 
              fill={isFavorite ? "white" : "transparent"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MapPin size={18} color={Colors.light.primary} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoText}>{boutique.locationInMall}</Text>
            <Text style={styles.infoSubtext}>{mall?.name}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.infoRow} onPress={handleCall}>
          <Phone size={18} color={Colors.light.primary} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Contact</Text>
            <Text style={styles.infoText}>{boutique.contactNumber}</Text>
            <Text style={styles.infoSubtext}>Tap to call</Text>
          </View>
          <ExternalLink size={16} color={Colors.light.placeholder} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoRow} onPress={handleInstagram}>
          <Instagram size={18} color={Colors.light.primary} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Instagram</Text>
            <Text style={styles.infoText}>{boutique.instagram}</Text>
            <Text style={styles.infoSubtext}>Tap to open Instagram</Text>
          </View>
          <ExternalLink size={16} color={Colors.light.placeholder} />
        </TouchableOpacity>
        
        {boutique.hasDelivery && (
          <View style={styles.infoRow}>
            <Truck size={18} color={Colors.light.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Delivery</Text>
              <Text style={styles.infoText}>Available</Text>
              <Text style={styles.infoSubtext}>Contact for details</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mallInfoContainer}>
        <Text style={styles.sectionTitle}>Located in</Text>
        {mall && (
          <View style={styles.mallInfo}>
            <Image source={{ uri: mall.image }} style={styles.mallImage} />
            <View style={styles.mallDetails}>
              <Text style={styles.mallName}>{mall.name}</Text>
              <Text style={styles.mallAddress}>{mall.address}</Text>
              <TouchableOpacity 
                style={styles.viewMallButton}
                onPress={() => {
                  // In a real app, this would navigate to the mall detail screen
                }}
              >
                <Text style={styles.viewMallButtonText}>View Mall</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.ctaContainer}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleCall}>
          <Phone size={20} color="white" />
          <Text style={styles.ctaButtonText}>Contact Seller</Text>
        </TouchableOpacity>
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
  imageGallery: {
    position: "relative",
    height: 300,
    backgroundColor: Colors.light.card,
  },
  galleryImage: {
    width: width,
    height: 300,
    resizeMode: "cover",
  },
  galleryIndicator: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  activeDot: {
    backgroundColor: "white",
    width: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    backgroundColor: Colors.light.card,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: Colors.light.text,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginBottom: 8,
    maxWidth: "90%",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.inactive,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    backgroundColor: Colors.light.notification,
  },
  infoContainer: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.light.placeholder,
    marginBottom: 2,
  },
  infoText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },
  infoSubtext: {
    fontSize: 12,
    color: Colors.light.placeholder,
    marginTop: 2,
  },
  mallInfoContainer: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  mallInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  mallImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  mallDetails: {
    flex: 1,
    marginLeft: 12,
  },
  mallName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  mallAddress: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginBottom: 8,
  },
  viewMallButton: {
    backgroundColor: "rgba(74, 111, 165, 0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  viewMallButtonText: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  ctaContainer: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: Colors.light.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
