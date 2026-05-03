import React, { useRef, useState } from "react";
import {
  View, StyleSheet, ActivityIndicator,
  StatusBar, TouchableOpacity, Text, BackHandler,
} from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";

const GYMPARK_URL = "https://gympark-fitness-242506455852.asia-southeast1.run.app/";

export default function WebViewScreen() {
  const webviewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (canGoBack && webviewRef.current) {
          webviewRef.current.goBack();
          return true;
        }
        return false;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [canGoBack])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>💪</Text>
          </View>
          <Text style={styles.topBarTitle}>GYMPARK FITNESS</Text>
        </View>
        {canGoBack && (
          <TouchableOpacity
            onPress={() => webviewRef.current?.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* WebView */}
      <WebView
        ref={webviewRef}
        source={{ uri: GYMPARK_URL }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(state) => setCanGoBack(state.canGoBack)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        originWhitelist={['*']}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        onShouldStartLoadWithRequest={(request) => {
          return true;
        }}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff3232" />
            <Text style={styles.loadingText}>Loading GymPark...</Text>
          </View>
        )}
        startInLoadingState={true}
      />

      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ff3232" />
          <Text style={styles.loadingText}>Loading GymPark...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  topBar: {
    height: 56, backgroundColor: "#0a0a0a",
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: "rgba(255,50,50,0.3)",
  },
  topBarLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#cc0000",
    alignItems: "center", justifyContent: "center",
  },
  logoIcon: { fontSize: 16 },
  topBarTitle: {
    color: "#fff", fontSize: 14,
    fontWeight: "800", letterSpacing: 2,
  },
  backBtn: {
    paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: "rgba(255,50,50,0.15)",
    borderRadius: 8, borderWidth: 1,
    borderColor: "rgba(255,50,50,0.3)",
  },
  backBtnText: { color: "#ff3232", fontSize: 13, fontWeight: "600" },
  webview: { flex: 1 },
  loadingContainer: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#000",
    alignItems: "center", justifyContent: "center", gap: 16,
  },
  loadingOverlay: {
    position: "absolute", top: 56, left: 0, right: 0, bottom: 0,
    backgroundColor: "#000",
    alignItems: "center", justifyContent: "center", gap: 16,
  },
  loadingText: { color: "rgba(255,255,255,0.5)", fontSize: 14 },
});