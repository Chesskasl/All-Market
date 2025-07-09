import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/colors";
import SearchBar from "@/components/SearchBar";
import CategoryScroll from "@/components/CategoryScroll";
import MallCard from "@/components/MallCard";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { malls, trendingProducts } from "@/constants/mockData";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSearch = (text: string) => {
    if (text.trim()) {
      router.push({
        pathname: "/search",
        params: { query: text },
      });
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === 0 ? null : categoryId);
  };

  const featuredMalls = malls.filter((mall) => mall.featured);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <SearchBar onSearch={handleSearch} />
        <CategoryScroll 
          onSelectCategory={handleCategorySelect} 
          selectedCategory={selectedCategory} 
        />
      </View>

      <View style={styles.heroContainer}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" }} 
          style={styles.heroImage} 
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Find the perfect boutique</Text>
          <Text style={styles.heroSubtitle}>Discover local shops in Almaty</Text>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => router.push("/explore")}
          >
            <Text style={styles.heroButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SectionHeader 
        title="Featured Shopping Centers" 
        route="/explore" 
      />
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.horizontalList}
      >
        {featuredMalls.map((mall) => (
          <View style={styles.compactCardContainer} key={mall.id}>
            <MallCard
              id={mall.id}
              name={mall.name}
              address={mall.address}
              image={mall.image}
              boutiquesCount={mall.boutiquesCount}
              featured={mall.featured}
              compact={true}
            />
          </View>
        ))}
      </ScrollView>

      <SectionHeader 
        title="Trending Products" 
        actionText="View All" 
        onAction={() => router.push("/search?filter=trending")} 
      />
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.horizontalList}
      >
        {trendingProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            boutiqueId={product.boutiqueId}
            boutiqueName={product.boutiqueName}
            mallId={product.mallId}
            mallName={product.mallName}
          />
        ))}
      </ScrollView>

      <SectionHeader 
        title="Recently Added" 
        route="/explore" 
      />
      
      <View style={styles.mallsContainer}>
        {malls.slice(0, 3).map((mall) => (
          <MallCard
            key={mall.id}
            id={mall.id}
            name={mall.name}
            address={mall.address}
            image={mall.image}
            boutiquesCount={mall.boutiquesCount}
            featured={mall.featured}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingTop: 8,
    backgroundColor: Colors.light.background,
  },
  heroContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    padding: 20,
  },
  heroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  horizontalList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  compactCardContainer: {
    width: 140,
  },
  mallsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
