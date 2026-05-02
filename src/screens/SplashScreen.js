import React, { useEffect, useRef } from "react";
import {
  View, Text, Animated, StyleSheet, StatusBar,
} from "react-native";

export default function SplashScreen({ onFinish }) {
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(40)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;
  const blackOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setHidden(true);
    Animated.sequence([
      Animated.timing(bgOpacity, {
        toValue: 1, duration: 600, useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1, friction: 5, tension: 80, useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 600, useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1, duration: 800, useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0, duration: 800, useNativeDriver: true,
        }),
      ]),
      Animated.delay(1800),
      Animated.timing(blackOpacity, {
        toValue: 1, duration: 700, useNativeDriver: true,
      }),
    ]).start(() => {
      StatusBar.setHidden(false);
      onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: bgOpacity }]}>
      <StatusBar hidden />

      {/* Background grid lines — premium feel */}
      <View style={styles.gridContainer}>
        {[...Array(8)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { top: `${i * 14}%` }]} />
        ))}
      </View>

      {/* Red accent top */}
      <View style={styles.topAccent} />

      {/* Center Content */}
      <View style={styles.center}>

        {/* Logo */}
        <Animated.View style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] }
        ]}>
          <View style={styles.logoRing}>
            <View style={styles.logoCore}>
              <Text style={styles.logoEmoji}>💪</Text>
            </View>
          </View>
          {/* Glow ring */}
          <View style={styles.glowRing} />
        </Animated.View>

        {/* Text */}
        <Animated.View style={[
          styles.textWrap,
          { opacity: textOpacity, transform: [{ translateY: textTranslate }] }
        ]}>
          <Text style={styles.welcomeLabel}>W E L C O M E  T O</Text>
          <Text style={styles.gymText}>GYM</Text>
          <Text style={styles.parkText}>PARK</Text>
          <View style={styles.redLine} />
          <Text style={styles.fitnessText}>F I T N E S S</Text>
          <Text style={styles.tagline}>STRENGTH • DISCIPLINE • RESULTS</Text>
        </Animated.View>
      </View>

      {/* Bottom accent */}
      <View style={styles.bottomAccent}>
        <View style={styles.bottomLine} />
        <Text style={styles.bottomText}>EST. 2024</Text>
        <View style={styles.bottomLine} />
      </View>

      {/* Black fade */}
      <Animated.View style={[styles.blackOverlay, { opacity: blackOpacity }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  gridLine: {
    position: "absolute",
    left: 0, right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  topAccent: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 3,
    backgroundColor: "#cc0000",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  logoRing: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 1.5,
    borderColor: "rgba(200,0,0,0.5)",
    alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  logoCore: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: "#cc0000",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#ff0000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20, shadowOpacity: 1,
    elevation: 20,
  },
  logoEmoji: { fontSize: 42 },
  glowRing: {
    position: "absolute",
    width: 140, height: 140, borderRadius: 70,
    borderWidth: 1,
    borderColor: "rgba(200,0,0,0.15)",
  },
  textWrap: { alignItems: "center" },
  welcomeLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11, letterSpacing: 6,
    fontWeight: "300", marginBottom: 8,
  },
  gymText: {
    color: "#ffffff",
    fontSize: 72, fontWeight: "900",
    letterSpacing: 8, lineHeight: 72,
    textShadowColor: "rgba(255,255,255,0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  parkText: {
    color: "#cc0000",
    fontSize: 72, fontWeight: "900",
    letterSpacing: 8, lineHeight: 72,
    marginTop: -8,
    textShadowColor: "rgba(200,0,0,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  redLine: {
    width: 80, height: 2,
    backgroundColor: "#cc0000",
    marginVertical: 16,
  },
  fitnessText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16, letterSpacing: 10,
    fontWeight: "300",
  },
  tagline: {
    color: "rgba(255,255,255,0.25)",
    fontSize: 9, letterSpacing: 3,
    fontWeight: "400", marginTop: 12,
  },
  bottomAccent: {
    position: "absolute",
    bottom: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomLine: {
    width: 40, height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bottomText: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 10, letterSpacing: 4,
  },
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 20,
  },
});