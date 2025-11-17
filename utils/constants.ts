/**
 * Constants for MindM8 application
 * This file contains all app-wide constants and configuration values
 */

export const COLORS = {
  primary: '#4A90E2',
  secondary: '#50C878',
  background: '#F5F5F5',
  text: '#333333',
  textLight: '#FFFFFF',
  error: '#E74C3C',
  success: '#2ECC71',
  warning: '#F39C12',
};

export const SIZES = {
  smallPadding: 10,
  mediumPadding: 20,
  largePadding: 30,
  buttonHeight: 60,
  iconSize: 24,
  largeIconSize: 48,
};

export const DETECTION_SETTINGS = {
  // Minimum confidence threshold for object detection (0-1)
  confidenceThreshold: 0.6,

  // How often to run detection (in milliseconds)
  detectionInterval: 1000,

  // Maximum number of predictions to process
  maxPredictions: 5,
};

export const SPEECH_SETTINGS = {
  // Speech rate (0.5 - 2.0, default 1.0)
  defaultRate: 1.0,

  // Speech pitch (0.5 - 2.0, default 1.0)
  defaultPitch: 1.0,

  // Language
  defaultLanguage: 'en-US',
};

export const ACCESSIBILITY = {
  // Hints for screen readers
  homeScreenHint: 'Double tap to navigate to different sections',
  cameraButtonHint: 'Double tap to start object detection',
  settingsButtonHint: 'Double tap to open settings',
  backButtonHint: 'Double tap to go back',
};
