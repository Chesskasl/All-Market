import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Heart } from "lucide-react-native";
import Colors from "@/constants/colors";
import MallCard from "@/components/MallCard";
import BoutiqueCard from "@/components/BoutiqueCard";
import { malls, boutiques } from "@/constants/mockData";

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState("boutiques");
  
  // Mock favorites - in a real app, these would come from a state store
  const favoriteMalls = malls.slice(0, 2);
  const favoriteBoutiques = boutiques.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "boutiques" && styles.activeTab]}
          onPress={() => setActiveTab("boutiques")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "boutiques" && styles.activeTabText,
            ]}
          >
            Boutiques
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "malls" && styles.activeTab]}
          onPress={() => setActiveTab("malls")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "malls" && styles.activeTabText,
            ]}
          >
            Shopping Centers
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "boutiques" ? (
          favoriteBoutiques.length > 0 ? (
            favoriteBoutiques.map((boutique) => (
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
              <Heart size={60} color={Colors.light.inactive} />
              <Text style={styles.emptyTitle}>No Favorite Boutiques</Text>
              <Text style={styles.emptyMessage}>
                Save your favorite boutiques to access them quickly.
              </Text>
            </View>
          )
        ) : favoriteMalls.length > 0 ? (
          favoriteMalls.map((mall) => (
            <MallCard
              key={mall.id}
              id={mall.id}
              name={mall.name}
              address={mall.address}
              image={mall.image}
              boutiquesCount={mall.boutiquesCount}
              featured={mall.featured}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Heart size={60} color={Colors.light.inactive} />
            <Text style={styles.emptyTitle}>No Favorite Shopping Centers</Text>
            <Text style={styles.emptyMessage}>
              Save your favorite shopping centers to access them quickly.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: Colors.light.inactive,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: Colors.light.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.placeholder,
  },
  activeTabText: {
    color: Colors.light.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: Colors.light.text,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.light.placeholder,
    textAlign: "center",
  },
});
