import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Filter } from "lucide-react-native";
import Colors from "@/constants/colors";
import SearchBar from "@/components/SearchBar";
import CategoryScroll from "@/components/CategoryScroll";
import MallCard from "@/components/MallCard";
import { malls } from "@/constants/mockData";
import { router } from "expo-router";

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === 0 ? null : categoryId);
  };

  const filteredMalls = malls.filter((mall) => {
    // Filter by search query
    if (searchQuery && !mall.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory && !mall.categories.includes(selectedCategory)) {
      return false;
    }
    
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar 
            placeholder="Search shopping centers..." 
            onSearch={handleSearch} 
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        
        <CategoryScroll 
          onSelectCategory={handleCategorySelect} 
          selectedCategory={selectedCategory} 
        />
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filters</Text>
          <View style={styles.filterOptions}>
            <TouchableOpacity 
              style={[styles.filterOption, styles.activeFilterOption]}
              onPress={() => {}}
            >
              <Text style={styles.activeFilterOptionText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.filterOption}
              onPress={() => {}}
            >
              <Text style={styles.filterOptionText}>Featured</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.filterOption}
              onPress={() => {}}
            >
              <Text style={styles.filterOptionText}>Most Boutiques</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.filterOption}
              onPress={() => {}}
            >
              <Text style={styles.filterOptionText}>Nearest</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView 
        style={styles.mallsList}
        contentContainerStyle={styles.mallsListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredMalls.length > 0 ? (
          filteredMalls.map((mall) => (
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
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptyMessage}>
              Try adjusting your search or filters to find what you're looking for.
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
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
  filtersContainer: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.inactive,
  },
  activeFilterOption: {
    backgroundColor: Colors.light.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  activeFilterOptionText: {
    fontSize: 14,
    color: Colors.light.card,
    fontWeight: "500",
  },
  mallsList: {
    flex: 1,
  },
  mallsListContent: {
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
