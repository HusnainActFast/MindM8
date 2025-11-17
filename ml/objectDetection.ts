/**
 * Object Detection Module for MindM8
 * Uses TensorFlow.js with Coco-SSD model for on-device object detection
 * NO API KEYS REQUIRED - Everything runs locally on the device
 */

import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export interface Detection {
  class: string;
  score: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

let model: cocoSsd.ObjectDetection | null = null;
let isInitialized = false;

/**
 * Initialize TensorFlow.js and load the Coco-SSD model
 * This function must be called before using detectObjects
 *
 * IMPORTANT: This uses a FREE, ON-DEVICE model with no API keys required
 */
export const initializeModel = async (): Promise<void> => {
  try {
    console.log('Initializing TensorFlow.js...');

    // Wait for TensorFlow.js to be ready
    await tf.ready();

    console.log('TensorFlow.js initialized. Backend:', tf.getBackend());
    console.log('Loading Coco-SSD model...');

    // Load the Coco-SSD model
    // This model runs entirely on-device and requires no API keys
    model = await cocoSsd.load({
      base: 'lite_mobilenet_v2', // Lightweight model optimized for mobile
    });

    isInitialized = true;
    console.log('Coco-SSD model loaded successfully!');
  } catch (error) {
    console.error('Error initializing object detection model:', error);
    throw new Error('Failed to initialize object detection. Please restart the app.');
  }
};

/**
 * Check if the model is initialized and ready to use
 */
export const isModelReady = (): boolean => {
  return isInitialized && model !== null;
};

/**
 * Detect objects in an image
 * @param imageData - The image data to analyze (can be ImageData, HTMLImageElement, or tensor)
 * @param maxDetections - Maximum number of objects to detect
 * @param minScore - Minimum confidence score (0-1)
 * @returns Array of detected objects with their classes, scores, and bounding boxes
 */
export const detectObjects = async (
  imageData: any,
  maxDetections: number = 5,
  minScore: number = 0.6
): Promise<Detection[]> => {
  if (!isModelReady()) {
    throw new Error('Model not initialized. Call initializeModel() first.');
  }

  try {
    // Run object detection
    const predictions = await model!.detect(imageData, maxDetections);

    // Filter by confidence threshold and format results
    const detections: Detection[] = predictions
      .filter((pred) => pred.score >= minScore)
      .map((pred) => ({
        class: pred.class,
        score: pred.score,
        bbox: pred.bbox as [number, number, number, number],
      }));

    return detections;
  } catch (error) {
    console.error('Error detecting objects:', error);
    return [];
  }
};

/**
 * Get information about the loaded model
 */
export const getModelInfo = (): { name: string; description: string; apiKeyRequired: boolean } => {
  return {
    name: 'Coco-SSD (MobileNet V2)',
    description:
      'A lightweight object detection model that can identify 90 different object classes. Runs entirely on your device with no internet connection required.',
    apiKeyRequired: false,
  };
};

/**
 * Dispose of the model and free up memory
 * Call this when the app is closing or when you're done with object detection
 */
export const disposeModel = (): void => {
  if (model) {
    model.dispose();
    model = null;
    isInitialized = false;
    console.log('Object detection model disposed');
  }
};

/**
 * Get list of all classes that can be detected by the model
 */
export const getSupportedClasses = (): string[] => {
  return [
    'person',
    'bicycle',
    'car',
    'motorcycle',
    'airplane',
    'bus',
    'train',
    'truck',
    'boat',
    'traffic light',
    'fire hydrant',
    'stop sign',
    'parking meter',
    'bench',
    'bird',
    'cat',
    'dog',
    'horse',
    'sheep',
    'cow',
    'elephant',
    'bear',
    'zebra',
    'giraffe',
    'backpack',
    'umbrella',
    'handbag',
    'tie',
    'suitcase',
    'frisbee',
    'skis',
    'snowboard',
    'sports ball',
    'kite',
    'baseball bat',
    'baseball glove',
    'skateboard',
    'surfboard',
    'tennis racket',
    'bottle',
    'wine glass',
    'cup',
    'fork',
    'knife',
    'spoon',
    'bowl',
    'banana',
    'apple',
    'sandwich',
    'orange',
    'broccoli',
    'carrot',
    'hot dog',
    'pizza',
    'donut',
    'cake',
    'chair',
    'couch',
    'potted plant',
    'bed',
    'dining table',
    'toilet',
    'tv',
    'laptop',
    'mouse',
    'remote',
    'keyboard',
    'cell phone',
    'microwave',
    'oven',
    'toaster',
    'sink',
    'refrigerator',
    'book',
    'clock',
    'vase',
    'scissors',
    'teddy bear',
    'hair drier',
    'toothbrush',
  ];
};
