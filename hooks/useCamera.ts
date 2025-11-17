/**
 * useCamera Hook
 * Manages camera permissions and state for MindM8
 */

import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { announce } from '../utils/accessibility';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      setIsLoading(true);

      // Request camera permission
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === 'granted');

      if (status === 'granted') {
        await announce('Camera permission granted');
      } else {
        await announce('Camera permission denied. Please enable camera access in settings.');
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setHasPermission(false);
      await announce('Error accessing camera');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hasPermission,
    isLoading,
    requestPermission: requestCameraPermission,
  };
};
