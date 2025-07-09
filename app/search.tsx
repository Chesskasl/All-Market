import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Filter, X } from "lucide-react-native";
import Colors from "@/constants/colors";
import SearchBar from "@/components/SearchBar";
import CategoryScroll from "@/components/CategoryScroll";
import BoutiqueCard from "@/components/BoutiqueCard";
import ProductCard from "@/components/ProductCard";
import { boutiques, trendingProducts } from "@/constants/mockData";

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const initialQuery = params.query as string || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("boutiques");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (params.filter === "trending") {
      setActiveTab("products");
    }
  }, [params.filter]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === 0 ? null : categoryId);
  };

  const filteredBoutiques = boutiques.filter((boutique) => {
    // Filter by search query
    if (
      searchQuery &&
      !boutique.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !boutique.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory && boutique.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });

  const filteredProducts = trendingProducts.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar 
            placeholder="Search..." 
            onSearch={handleSearch} 
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <X size={20} color={Colors.light.text} />
            ) : (
              <Filter size={20} color={Colors.light.text} />
            )}
          </TouchableOpacity>
        </View>
        
        {showFilters && (
          <View style={styles.filtersSection}>
            <CategoryScroll 
              onSelectCategory={handleCategorySelect} 
              selectedCategory={selectedCategory} 
            />
            
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
                style={[styles.tab, activeTab === "products" && styles.activeTab]}
                onPress={() => setActiveTab("products")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "products" && styles.activeTabText,
                  ]}
                >
                  Products
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {searchQuery && (
          <Text style={styles.resultsText}>
            Results for "{searchQuery}"
          </Text>
        )}

        {activeTab === "boutiques" ? (
          filteredBoutiques.length > 0 ? (
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
                Try adjusting your search or filters to find what you're looking for.
              </Text>
            </View>
          )
        ) : (
          <View style={styles.productsGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <View style={styles.productItem} key={product.id}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    boutiqueId={product.boutiqueId}
                    boutiqueName={product.boutiqueName}
                    mallId={product.mallId}
                    mallName={product.mallName}
                  />
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No Products Found</Text>
                <Text style={styles.emptyMessage}>
                  Try adjusting your search or filters to find what you're looking for.
                </Text>
              </View>
            )}
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
  header: {
    paddingTop: 8,
    backgroundColor: Colors.light.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.light.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filtersSection: {
    marginTop: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 12,
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
  resultsText: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginBottom: 16,
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
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    marginBottom: 16,
  },
});
