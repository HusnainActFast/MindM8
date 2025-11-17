/**
 * DetectionDisplay Component
 * Displays the list of detected objects with accessibility features
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Detection } from '../ml/objectDetection';
import { COLORS, SIZES } from '../utils/constants';

interface DetectionDisplayProps {
  detections: Detection[];
}

export const DetectionDisplay: React.FC<DetectionDisplayProps> = ({ detections }) => {
  if (detections.length === 0) {
    return (
      <View
        style={styles.container}
        accessible={true}
        accessibilityLabel="No objects detected"
      >
        <Text style={styles.emptyText}>No objects detected</Text>
      </View>
    );
  }

  const renderDetection = ({ item, index }: { item: Detection; index: number }) => {
    const confidencePercent = Math.round(item.score * 100);

    return (
      <View
        style={styles.detectionItem}
        accessible={true}
        accessibilityLabel={`${item.class}, ${confidencePercent} percent confident`}
        accessibilityRole="text"
      >
        <Text style={styles.objectName}>{item.class}</Text>
        <Text style={styles.confidence}>{confidencePercent}% confident</Text>
      </View>
    );
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={`${detections.length} objects detected`}
    >
      <Text style={styles.title}>Detected Objects:</Text>
      <FlatList
        data={detections}
        renderItem={renderDetection}
        keyExtractor={(item, index) => `${item.class}-${index}`}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.mediumPadding,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginVertical: SIZES.smallPadding,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.smallPadding,
  },
  list: {
    maxHeight: 200,
  },
  detectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.smallPadding,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  objectName: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  confidence: {
    fontSize: 14,
    color: COLORS.primary,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
