/**
 * HomeScreen Component
 * Main landing screen with navigation to other features
 * Fully accessible for blind and partially sighted users
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { AccessibleButton } from '../components/AccessibleButton';
import { announce } from '../utils/accessibility';
import { COLORS, SIZES, ACCESSIBILITY } from '../utils/constants';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    // Announce screen when it loads
    announce('Welcome to MindM8. Your AI vision assistant.');
  }, []);

  const handleCameraPress = () => {
    announce('Opening camera');
    navigation.navigate('Camera');
  };

  const handleSettingsPress = () => {
    announce('Opening settings');
    navigation.navigate('Settings');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      accessible={true}
      accessibilityLabel="MindM8 Home Screen"
    >
      <View style={styles.header}>
        <Text
          style={styles.title}
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel="MindM8"
        >
          MindM8
        </Text>
        <Text
          style={styles.subtitle}
          accessible={true}
          accessibilityLabel="Your AI-powered vision assistant"
        >
          Your AI Vision Assistant
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text
          style={styles.infoTitle}
          accessible={true}
          accessibilityRole="header"
        >
          How it works:
        </Text>
        <Text
          style={styles.infoText}
          accessible={true}
          accessibilityLabel="MindM8 uses your phone's camera to identify objects in real-time and speaks out what it sees. No internet connection required."
        >
          • Uses your phone's camera to identify objects{'\n'}
          • Speaks out what it sees in real-time{'\n'}
          • Works completely offline{'\n'}
          • No API keys or subscriptions needed
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <AccessibleButton
          title="Start Camera"
          onPress={handleCameraPress}
          variant="primary"
          accessibilityLabel="Start Camera"
          accessibilityHint={ACCESSIBILITY.cameraButtonHint}
        />

        <AccessibleButton
          title="Settings"
          onPress={handleSettingsPress}
          variant="secondary"
          accessibilityLabel="Settings"
          accessibilityHint={ACCESSIBILITY.settingsButtonHint}
        />
      </View>

      <View style={styles.footer}>
        <Text
          style={styles.footerText}
          accessible={true}
          accessibilityLabel="Version 1.0.0 - MVP. Powered by TensorFlow.js"
        >
          Version 1.0.0 - MVP{'\n'}
          Powered by TensorFlow.js
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SIZES.mediumPadding,
  },
  header: {
    alignItems: 'center',
    marginVertical: SIZES.largePadding,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.smallPadding,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: SIZES.mediumPadding,
    borderRadius: 12,
    marginVertical: SIZES.mediumPadding,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.smallPadding,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  buttonContainer: {
    marginVertical: SIZES.mediumPadding,
  },
  footer: {
    alignItems: 'center',
    marginTop: SIZES.largePadding,
  },
  footerText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});

export default HomeScreen;
