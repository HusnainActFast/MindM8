/**
 * useObjectDetection Hook
 * Manages object detection state and operations
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  initializeModel,
  detectObjects,
  isModelReady,
  Detection,
} from '../ml/objectDetection';
import { announceDetections } from '../utils/accessibility';
import { DETECTION_SETTINGS } from '../utils/constants';

export const useObjectDetection = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [lastDetections, setLastDetections] = useState<Detection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize the ML model when the hook is first used
  useEffect(() => {
    const init = async () => {
      try {
        await initializeModel();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        setError('Failed to initialize object detection');
        console.error(err);
      }
    };

    init();
  }, []);

  /**
   * Start continuous object detection
   */
  const startDetection = useCallback(
    (
      imageSource: any,
      interval: number = DETECTION_SETTINGS.detectionInterval,
      onDetect?: (detections: Detection[]) => void
    ) => {
      if (!isModelReady()) {
        setError('Model not ready');
        return;
      }

      setIsDetecting(true);
      setError(null);

      // Clear any existing interval
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }

      // Set up detection interval
      detectionIntervalRef.current = setInterval(async () => {
        try {
          const detections = await detectObjects(
            imageSource,
            DETECTION_SETTINGS.maxPredictions,
            DETECTION_SETTINGS.confidenceThreshold
          );

          setLastDetections(detections);

          if (onDetect) {
            onDetect(detections);
          }
        } catch (err) {
          console.error('Detection error:', err);
          setError('Error during detection');
        }
      }, interval);
    },
    []
  );

  /**
   * Stop continuous object detection
   */
  const stopDetection = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setIsDetecting(false);
  }, []);

  /**
   * Detect objects once (single shot)
   */
  const detectOnce = useCallback(async (imageSource: any): Promise<Detection[]> => {
    if (!isModelReady()) {
      throw new Error('Model not ready');
    }

    try {
      const detections = await detectObjects(
        imageSource,
        DETECTION_SETTINGS.maxPredictions,
        DETECTION_SETTINGS.confidenceThreshold
      );

      setLastDetections(detections);
      return detections;
    } catch (err) {
      console.error('Detection error:', err);
      setError('Error during detection');
      return [];
    }
  }, []);

  /**
   * Announce the last detections using text-to-speech
   */
  const announceLastDetections = useCallback(async () => {
    await announceDetections(lastDetections);
  }, [lastDetections]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return {
    isInitialized,
    isDetecting,
    lastDetections,
    error,
    startDetection,
    stopDetection,
    detectOnce,
    announceLastDetections,
  };
};
