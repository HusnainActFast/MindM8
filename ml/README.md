# MindM8 ML Module

## Overview
This module handles on-device object detection using TensorFlow.js and the Coco-SSD model.

## ✅ NO API KEYS REQUIRED
Everything runs locally on the device. No cloud services, no subscriptions, completely free.

## How It Works

### 1. **TensorFlow.js**
- JavaScript library for machine learning
- Runs models directly in the browser or on mobile devices
- No server needed

### 2. **Coco-SSD Model**
- Pre-trained object detection model
- Can identify 90 different object classes
- Based on MobileNet V2 architecture (optimized for mobile)
- Model size: ~5-10 MB (downloads once, cached locally)

### 3. **Detection Process**
1. Camera captures a frame
2. Frame is processed by TensorFlow.js
3. Coco-SSD model analyzes the image
4. Returns detected objects with:
   - Class name (e.g., "person", "car", "bottle")
   - Confidence score (0-1)
   - Bounding box coordinates

## Performance Optimization

### Current Settings
- **Model**: lite_mobilenet_v2 (lightweight version)
- **Detection Interval**: 1000ms (1 detection per second)
- **Max Predictions**: 5 objects
- **Confidence Threshold**: 0.6 (60%)

### Why These Settings?
- **Battery Life**: Running detection every second saves battery
- **Accuracy**: 60% threshold reduces false positives
- **Performance**: Lightweight model runs smoothly on most devices

## Supported Object Classes
The model can detect 90 different object classes including:
- **People**: person
- **Vehicles**: car, bicycle, motorcycle, bus, truck, boat, airplane, train
- **Animals**: dog, cat, bird, horse, cow, sheep, etc.
- **Indoor Objects**: chair, couch, table, bed, TV, laptop, book, etc.
- **Food**: banana, apple, pizza, sandwich, etc.
- **Everyday Items**: bottle, cup, cell phone, backpack, umbrella, etc.

See `getSupportedClasses()` for the complete list.

## Usage

```typescript
import { initializeModel, detectObjects, isModelReady } from './ml/objectDetection';

// Initialize the model (call once when app starts)
await initializeModel();

// Check if ready
if (isModelReady()) {
  // Detect objects in an image
  const detections = await detectObjects(imageData, 5, 0.6);

  detections.forEach(detection => {
    console.log(`Found: ${detection.class} (${Math.round(detection.score * 100)}% confident)`);
  });
}
```

## Future Upgrades

### Option 1: Faster Local Models
- **TensorFlow Lite**: Even faster models optimized for mobile
- **Custom Models**: Train your own models for specific use cases
- **Edge TPU**: Hardware acceleration on supported devices

### Option 2: Cloud Inference (When Budget Allows)
- **Google Cloud Vision API**: More accurate, broader class support
- **Amazon Rekognition**: Similar to Google Vision
- **Azure Computer Vision**: Microsoft's alternative
- **Custom API**: Deploy your own models on cloud servers

**Note**: Cloud options require API keys and incur costs

### Option 3: Smart Glasses Integration
- Stream video from smart glasses
- Same object detection pipeline
- Hands-free operation
- Audio feedback through bone conduction

### Option 4: Additional Features
- **Scene understanding**: Describe entire scenes, not just objects
- **Text recognition (OCR)**: Read signs, labels, documents
- **Face recognition**: Identify people (with privacy considerations)
- **Color detection**: Identify colors of objects
- **Distance estimation**: Approximate distance to objects

## Troubleshooting

### Model fails to load
- Check internet connection (needed for first download only)
- Clear app cache and try again
- Restart the app

### Slow performance
- Reduce detection frequency (increase interval)
- Lower max predictions
- Increase confidence threshold

### Poor accuracy
- Ensure good lighting
- Hold camera steady
- Get closer to objects
- Lower confidence threshold (may increase false positives)

## Technical Details

### Dependencies
- `@tensorflow/tfjs`: Core TensorFlow.js library
- `@tensorflow/tfjs-react-native`: React Native bindings
- `@tensorflow-models/coco-ssd`: Pre-trained Coco-SSD model

### Model Variants
- **lite_mobilenet_v2**: Smallest, fastest (current)
- **mobilenet_v2**: Balanced speed/accuracy
- **inception_v2**: Most accurate, slower

### Output Format
```typescript
interface Detection {
  class: string;           // Object class name
  score: number;           // Confidence (0-1)
  bbox: [x, y, w, h];     // Bounding box [x, y, width, height]
}
```

## License
The Coco-SSD model is open-source and free to use under the Apache 2.0 license.
