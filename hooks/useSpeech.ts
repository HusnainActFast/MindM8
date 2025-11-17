/**
 * useSpeech Hook
 * Manages text-to-speech functionality with customizable settings
 */

import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { announce, stopSpeaking, isSpeaking } from '../utils/accessibility';
import { getSpeechRate, getSpeechPitch } from '../utils/storage';

export const useSpeech = () => {
  const [speaking, setSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechPitch, setSpeechPitch] = useState(1.0);

  // Load saved settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const rate = await getSpeechRate();
    const pitch = await getSpeechPitch();
    setSpeechRate(rate);
    setSpeechPitch(pitch);
  };

  /**
   * Speak text with current settings
   */
  const speak = async (text: string, interrupt: boolean = false) => {
    try {
      if (interrupt) {
        await stopSpeaking();
      }

      setSpeaking(true);

      await Speech.speak(text, {
        rate: speechRate,
        pitch: speechPitch,
        onDone: () => setSpeaking(false),
        onStopped: () => setSpeaking(false),
        onError: () => setSpeaking(false),
      });
    } catch (error) {
      console.error('Speech error:', error);
      setSpeaking(false);
    }
  };

  /**
   * Stop current speech
   */
  const stop = async () => {
    await stopSpeaking();
    setSpeaking(false);
  };

  /**
   * Check if currently speaking
   */
  const checkSpeaking = async () => {
    const speaking = await isSpeaking();
    setSpeaking(speaking);
    return speaking;
  };

  return {
    speaking,
    speechRate,
    speechPitch,
    speak,
    stop,
    checkSpeaking,
    setSpeechRate,
    setSpeechPitch,
  };
};
