/**
 * Accessibility utilities for MindM8
 * Helper functions to ensure the app is fully accessible for blind and partially sighted users
 */

import * as Speech from 'expo-speech';
import { SPEECH_SETTINGS } from './constants';

/**
 * Announces text using the device's text-to-speech engine
 * @param text - The text to announce
 * @param interrupt - Whether to interrupt current speech
 */
export const announce = async (text: string, interrupt: boolean = false): Promise<void> => {
  try {
    if (interrupt) {
      await Speech.stop();
    }

    await Speech.speak(text, {
      language: SPEECH_SETTINGS.defaultLanguage,
      pitch: SPEECH_SETTINGS.defaultPitch,
      rate: SPEECH_SETTINGS.defaultRate,
    });
  } catch (error) {
    console.error('Error with text-to-speech:', error);
  }
};

/**
 * Stops any ongoing speech
 */
export const stopSpeaking = async (): Promise<void> => {
  try {
    await Speech.stop();
  } catch (error) {
    console.error('Error stopping speech:', error);
  }
};

/**
 * Checks if speech is currently active
 */
export const isSpeaking = async (): Promise<boolean> => {
  try {
    return await Speech.isSpeakingAsync();
  } catch (error) {
    console.error('Error checking speech status:', error);
    return false;
  }
};

/**
 * Formats object detection results into a natural sentence
 * @param objectName - The detected object name
 * @param confidence - The confidence level (0-1)
 */
export const formatDetectionAnnouncement = (objectName: string, confidence: number): string => {
  const confidencePercent = Math.round(confidence * 100);

  if (confidencePercent >= 90) {
    return `I see a ${objectName}`;
  } else if (confidencePercent >= 70) {
    return `I think I see a ${objectName}`;
  } else {
    return `This might be a ${objectName}`;
  }
};

/**
 * Announces multiple detected objects
 * @param detections - Array of detection results
 */
export const announceDetections = async (
  detections: Array<{ class: string; score: number }>
): Promise<void> => {
  if (detections.length === 0) {
    await announce('No objects detected');
    return;
  }

  if (detections.length === 1) {
    const announcement = formatDetectionAnnouncement(
      detections[0].class,
      detections[0].score
    );
    await announce(announcement);
    return;
  }

  // Multiple objects
  const objectList = detections
    .map((det, index) => {
      if (index === detections.length - 1) {
        return `and a ${det.class}`;
      }
      return `a ${det.class}`;
    })
    .join(', ');

  await announce(`I see ${objectList}`);
};
