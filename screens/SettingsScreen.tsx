/**
 * SettingsScreen Component
 * Allows users to customize speech and detection settings
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { AccessibleButton } from '../components/AccessibleButton';
import { announce } from '../utils/accessibility';
import {
  getSpeechRate,
  getSpeechPitch,
  getConfidenceThreshold,
  saveSpeechRate,
  saveSpeechPitch,
  saveConfidenceThreshold,
  clearAllSettings,
} from '../utils/storage';
import { COLORS, SIZES } from '../utils/constants';
import { getModelInfo, getSupportedClasses } from '../ml/objectDetection';

const SettingsScreen: React.FC = () => {
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.6);
  const [highContrastMode, setHighContrastMode] = useState(false);

  useEffect(() => {
    loadSettings();
    announce('Settings screen');
  }, []);

  const loadSettings = async () => {
    const rate = await getSpeechRate();
    const pitch = await getSpeechPitch();
    const threshold = await getConfidenceThreshold();

    setSpeechRate(rate);
    setSpeechPitch(pitch);
    setConfidenceThreshold(threshold);
  };

  const handleSaveSettings = async () => {
    try {
      await saveSpeechRate(speechRate);
      await saveSpeechPitch(speechPitch);
      await saveConfidenceThreshold(confidenceThreshold);

      announce('Settings saved successfully');
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      announce('Error saving settings');
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleResetSettings = async () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: async () => {
            await clearAllSettings();
            setSpeechRate(1.0);
            setSpeechPitch(1.0);
            setConfidenceThreshold(0.6);
            announce('Settings reset to default');
          },
        },
      ]
    );
  };

  const handleShowModelInfo = () => {
    const modelInfo = getModelInfo();
    Alert.alert(
      'Object Detection Model',
      `${modelInfo.name}\n\n${modelInfo.description}\n\nAPI Key Required: ${
        modelInfo.apiKeyRequired ? 'Yes' : 'No'
      }`
    );
  };

  const handleShowSupportedObjects = () => {
    const classes = getSupportedClasses();
    Alert.alert(
      'Supported Objects',
      `The model can detect ${classes.length} different object types including:\n\n${classes
        .slice(0, 20)
        .join(', ')}...\n\nAnd ${classes.length - 20} more!`
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text
        style={styles.sectionTitle}
        accessible={true}
        accessibilityRole="header"
      >
        Speech Settings
      </Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Speech Rate: {speechRate.toFixed(1)}</Text>
        <View style={styles.buttonRow}>
          <AccessibleButton
            title="-"
            onPress={() => setSpeechRate(Math.max(0.5, speechRate - 0.1))}
            style={styles.smallButton}
            accessibilityLabel="Decrease speech rate"
          />
          <AccessibleButton
            title="+"
            onPress={() => setSpeechRate(Math.min(2.0, speechRate + 0.1))}
            style={styles.smallButton}
            accessibilityLabel="Increase speech rate"
          />
        </View>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Speech Pitch: {speechPitch.toFixed(1)}</Text>
        <View style={styles.buttonRow}>
          <AccessibleButton
            title="-"
            onPress={() => setSpeechPitch(Math.max(0.5, speechPitch - 0.1))}
            style={styles.smallButton}
            accessibilityLabel="Decrease speech pitch"
          />
          <AccessibleButton
            title="+"
            onPress={() => setSpeechPitch(Math.min(2.0, speechPitch + 0.1))}
            style={styles.smallButton}
            accessibilityLabel="Increase speech pitch"
          />
        </View>
      </View>

      <Text
        style={styles.sectionTitle}
        accessible={true}
        accessibilityRole="header"
      >
        Detection Settings
      </Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>
          Confidence: {Math.round(confidenceThreshold * 100)}%
        </Text>
        <View style={styles.buttonRow}>
          <AccessibleButton
            title="-"
            onPress={() =>
              setConfidenceThreshold(Math.max(0.3, confidenceThreshold - 0.1))
            }
            style={styles.smallButton}
            accessibilityLabel="Decrease confidence threshold"
          />
          <AccessibleButton
            title="+"
            onPress={() =>
              setConfidenceThreshold(Math.min(0.9, confidenceThreshold + 0.1))
            }
            style={styles.smallButton}
            accessibilityLabel="Increase confidence threshold"
          />
        </View>
      </View>

      <Text style={styles.helpText}>
        Lower confidence = more detections (may include false positives){'\n'}
        Higher confidence = fewer but more accurate detections
      </Text>

      <Text
        style={styles.sectionTitle}
        accessible={true}
        accessibilityRole="header"
      >
        Display Settings
      </Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>High Contrast Mode</Text>
        <Switch
          value={highContrastMode}
          onValueChange={setHighContrastMode}
          accessible={true}
          accessibilityLabel="High contrast mode toggle"
          accessibilityRole="switch"
        />
      </View>

      <Text
        style={styles.sectionTitle}
        accessible={true}
        accessibilityRole="header"
      >
        Model Information
      </Text>

      <AccessibleButton
        title="View Model Details"
        onPress={handleShowModelInfo}
        variant="secondary"
        accessibilityLabel="View object detection model details"
      />

      <AccessibleButton
        title="Supported Objects"
        onPress={handleShowSupportedObjects}
        variant="secondary"
        accessibilityLabel="View list of supported objects"
      />

      <View style={styles.actionButtons}>
        <AccessibleButton
          title="Save Settings"
          onPress={handleSaveSettings}
          variant="primary"
          accessibilityLabel="Save all settings"
        />

        <AccessibleButton
          title="Reset to Default"
          onPress={handleResetSettings}
          variant="danger"
          accessibilityLabel="Reset all settings to default values"
        />
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.mediumPadding,
    marginBottom: SIZES.smallPadding,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.smallPadding,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  smallButton: {
    width: 50,
    height: 40,
    marginVertical: 0,
  },
  helpText: {
    fontSize: 14,
    color: '#666666',
    marginTop: SIZES.smallPadding,
    fontStyle: 'italic',
  },
  actionButtons: {
    marginTop: SIZES.largePadding,
  },
});

export default SettingsScreen;
