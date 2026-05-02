import React, { useEffect, useRef } from "react";
import {
  View, Text, Animated, StyleSheet,
  Dimensions, ImageBackground, StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ onFinish }) {
  const blurOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(30)).current;
  const blackOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setHidden(true);
    Animated.sequence([
      Animated.timing(blurOpacity, {
        toValue: 1, duration: 800, useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1, friction: 6, tension: 100, useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 500, useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1, duration: 700, useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0, duration: 700, useNativeDriver: true,
        }),
      ]),
      Animated.delay(1500),
      Animated.timing(blackOpacity, {
        toValue: 1, duration: 800, useNativeDriver: true,
      }),
    ]).start(() => {
      StatusBar.setHidden(false);
      onFinish();
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[styles.bgContainer, { opacity: blurOpacity }]}>
        <ImageBackground
          source={require("../../assets/gympark-bg.jpg")}
          style={styles.bg}
          blurRadius={15}
          resizeMode="cover"
        >
          <View style={styles.darkOverlay} />
        </ImageBackground>
      </Animated.View>

      <View style={styles.centerContent}>
        <Animated.View style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] }
        ]}>
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <Text style={styles.logoIcon}>💪</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[
          styles.textContainer,
          { opacity: textOpacity, transform: [{ translateY: textTranslate }] }
        ]}>
          <Text style={styles.welcomeText}>WELCOME TO</Text>
          <Text style={styles.brandText}>GYMPARK</Text>
          <Text style={styles.subText}>FITNESS</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>Stronger Every Day</Text>
        </Animated.View>
      </View>

      <Animated.View style={[styles.blackOverlay, { opacity: blackOpacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  bgContainer: { ...StyleSheet.absoluteFillObject },
  bg: { width: "100%", height: "100%" },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },
  centerContent: { alignItems: "center", justifyContent: "center", zIndex: 10 },
  logoContainer: { marginBottom: 32, alignItems: "center" },
  logoOuter: {
    width: 110, height: 110, borderRadius: 55,
    borderWidth: 2, borderColor: "rgba(255,50,50,0.6)",
    alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  logoInner: {
    width: 85, height: 85, borderRadius: 42,
    backgroundColor: "rgba(200,0,0,0.85)",
    alignItems: "center", justifyContent: "center",
  },
  logoIcon: { fontSize: 40 },
  textContainer: { alignItems: "center" },
  welcomeText: { color: "rgba(255,255,255,0.7)", fontSize: 13, letterSpacing: 8, fontWeight: "400", marginBottom: 4 },
  brandText: {
    color: "#fff", fontSize: 52, fontWeight: "900", letterSpacing: 6, lineHeight: 56,
    textShadowColor: "rgba(220,0,0,0.8)", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20,
  },
  subText: { color: "#ff3232", fontSize: 28, fontWeight: "800", letterSpacing: 14, marginTop: -4 },
  divider: { width: 60, height: 2, backgroundColor: "#ff3232", marginVertical: 16, borderRadius: 2 },
  tagline: { color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: 4, fontWeight: "300" },
  blackOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "#000", zIndex: 20 },
});
