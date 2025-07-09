import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import Colors from "@/constants/colors";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
  route?: string;
}

export default function SectionHeader({ title, actionText = "See All", onAction, route }: SectionHeaderProps) {
  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (route) {
      router.push(route);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {(onAction || route) && (
        <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
          <Text style={styles.actionText}>{actionText}</Text>
          <ChevronRight size={16} color={Colors.light.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
  },
});
