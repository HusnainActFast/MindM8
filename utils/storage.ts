/**
 * Storage utilities for MindM8
 * Handles persistent storage of user settings and preferences
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SPEECH_RATE: '@mindm8_speech_rate',
  SPEECH_PITCH: '@mindm8_speech_pitch',
  CONFIDENCE_THRESHOLD: '@mindm8_confidence_threshold',
  DETECTION_INTERVAL: '@mindm8_detection_interval',
};

/**
 * Save speech rate preference
 */
export const saveSpeechRate = async (rate: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.SPEECH_RATE, rate.toString());
  } catch (error) {
    console.error('Error saving speech rate:', error);
  }
};

/**
 * Get speech rate preference
 */
export const getSpeechRate = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.SPEECH_RATE);
    return value ? parseFloat(value) : 1.0;
  } catch (error) {
    console.error('Error getting speech rate:', error);
    return 1.0;
  }
};

/**
 * Save speech pitch preference
 */
export const saveSpeechPitch = async (pitch: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.SPEECH_PITCH, pitch.toString());
  } catch (error) {
    console.error('Error saving speech pitch:', error);
  }
};

/**
 * Get speech pitch preference
 */
export const getSpeechPitch = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.SPEECH_PITCH);
    return value ? parseFloat(value) : 1.0;
  } catch (error) {
    console.error('Error getting speech pitch:', error);
    return 1.0;
  }
};

/**
 * Save confidence threshold preference
 */
export const saveConfidenceThreshold = async (threshold: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.CONFIDENCE_THRESHOLD, threshold.toString());
  } catch (error) {
    console.error('Error saving confidence threshold:', error);
  }
};

/**
 * Get confidence threshold preference
 */
export const getConfidenceThreshold = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.CONFIDENCE_THRESHOLD);
    return value ? parseFloat(value) : 0.6;
  } catch (error) {
    console.error('Error getting confidence threshold:', error);
    return 0.6;
  }
};

/**
 * Save detection interval preference
 */
export const saveDetectionInterval = async (interval: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.DETECTION_INTERVAL, interval.toString());
  } catch (error) {
    console.error('Error saving detection interval:', error);
  }
};

/**
 * Get detection interval preference
 */
export const getDetectionInterval = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.DETECTION_INTERVAL);
    return value ? parseInt(value, 10) : 1000;
  } catch (error) {
    console.error('Error getting detection interval:', error);
    return 1000;
  }
};

/**
 * Clear all stored preferences
 */
export const clearAllSettings = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (error) {
    console.error('Error clearing settings:', error);
  }
};
