import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Baby, Dumbbell, Shirt, Smartphone, Sofa, Sparkles, Watch } from "lucide-react-native";
import Colors from "@/constants/colors";
import { categories } from "@/constants/mockData";

interface CategoryScrollProps {
  onSelectCategory?: (categoryId: number) => void;
  selectedCategory?: number | null;
}

export default function CategoryScroll({ onSelectCategory, selectedCategory }: CategoryScrollProps) {
  const getIcon = (iconName: string, isSelected: boolean) => {
    const color = isSelected ? Colors.light.card : Colors.light.text;
    const size = 20;

    switch (iconName) {
      case "shirt":
        return <Shirt size={size} color={color} />;
      case "footprints":
        return <Shirt size={size} color={color} />;
      case "watch":
        return <Watch size={size} color={color} />;
      case "smartphone":
        return <Smartphone size={size} color={color} />;
      case "sofa":
        return <Sofa size={size} color={color} />;
      case "sparkles":
        return <Sparkles size={size} color={color} />;
      case "dumbbell":
        return <Dumbbell size={size} color={color} />;
      case "baby":
        return <Baby size={size} color={color} />;
      default:
        return <Shirt size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryItem,
            !selectedCategory && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory && onSelectCategory(0)}
        >
          <Text
            style={[
              styles.categoryText,
              !selectedCategory && styles.selectedCategoryText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                isSelected && styles.selectedCategory,
              ]}
              onPress={() => onSelectCategory && onSelectCategory(category.id)}
            >
              {getIcon(category.icon, isSelected)}
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    gap: 6,
  },
  selectedCategory: {
    backgroundColor: Colors.light.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  selectedCategoryText: {
    color: Colors.light.card,
  },
});
