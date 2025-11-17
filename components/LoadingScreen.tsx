/**
 * LoadingScreen Component
 * Displays a loading indicator with accessibility support
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
}) => {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={message}
      accessibilityRole="progressbar"
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.mediumPadding,
  },
  message: {
    marginTop: SIZES.mediumPadding,
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
  },
});
