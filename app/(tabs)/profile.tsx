import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Image } from "react-native";
import { ChevronRight, LogOut, ShoppingBag, Store, User as UserIcon } from "lucide-react-native";
import Colors from "@/constants/colors";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [isSellerAccount, setIsSellerAccount] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleSellerDashboard = () => {
    // In a real app, this would navigate to the seller dashboard
    alert("Seller Dashboard would open here");
  };

  const handleLogout = () => {
    // In a real app, this would handle logout
    alert("Logout functionality would be implemented here");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887" }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.email}>sarah.johnson@example.com</Text>
        
        {isSellerAccount && (
          <TouchableOpacity style={styles.sellerButton} onPress={handleSellerDashboard}>
            <Store size={16} color={Colors.light.card} />
            <Text style={styles.sellerButtonText}>Seller Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/modal")}>
          <View style={styles.menuItemLeft}>
            <UserIcon size={20} color={Colors.light.text} />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
          <ChevronRight size={20} color={Colors.light.placeholder} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/modal")}>
          <View style={styles.menuItemLeft}>
            <ShoppingBag size={20} color={Colors.light.text} />
            <Text style={styles.menuItemText}>My Orders</Text>
          </View>
          <ChevronRight size={20} color={Colors.light.placeholder} />
        </TouchableOpacity>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Store size={20} color={Colors.light.text} />
            <Text style={styles.menuItemText}>Seller Account</Text>
          </View>
          <Switch
            value={isSellerAccount}
            onValueChange={setIsSellerAccount}
            trackColor={{ false: Colors.light.inactive, true: Colors.light.primary }}
            thumbColor={Colors.light.card}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Text style={styles.menuItemText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.light.inactive, true: Colors.light.primary }}
            thumbColor={Colors.light.card}
          />
        </View>
        
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Text style={styles.menuItemText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: Colors.light.inactive, true: Colors.light.primary }}
            thumbColor={Colors.light.card}
          />
        </View>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/modal")}>
          <View style={styles.menuItemLeft}>
            <Text style={styles.menuItemText}>Language</Text>
          </View>
          <View style={styles.menuItemRight}>
            <Text style={styles.menuItemValue}>English</Text>
            <ChevronRight size={20} color={Colors.light.placeholder} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/modal")}>
          <View style={styles.menuItemLeft}>
            <Text style={styles.menuItemText}>About AllMarket</Text>
          </View>
          <ChevronRight size={20} color={Colors.light.placeholder} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/modal")}>
          <View style={styles.menuItemLeft}>
            <Text style={styles.menuItemText}>Privacy Policy</Text>
          </View>
          <ChevronRight size={20} color={Colors.light.placeholder} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/modal")}>
          <View style={styles.menuItemLeft}>
            <Text style={styles.menuItemText}>Terms of Service</Text>
          </View>
          <ChevronRight size={20} color={Colors.light.placeholder} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={Colors.light.notification} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>AllMarket v1.0.0</Text>
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
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.card,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.light.primary,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginBottom: 16,
  },
  sellerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  sellerButtonText: {
    color: Colors.light.card,
    fontWeight: "500",
    fontSize: 14,
  },
  section: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    marginTop: 20,
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
    marginBottom: 16,
    color: Colors.light.text,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemValue: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: "rgba(230, 57, 70, 0.1)",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.notification,
  },
  versionContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  versionText: {
    fontSize: 12,
    color: Colors.light.placeholder,
  },
});
