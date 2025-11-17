# MindM8 - AI Vision Assistant for the Blind

MindM8 is a mobile app designed specifically for blind and partially sighted users. It uses your phone's camera to recognize objects in real-time and speaks out what it sees - **completely free, with NO API keys required**.

## ✨ Features

- **Real-time Object Detection**: Uses on-device AI to identify objects
- **Text-to-Speech**: Announces detected objects automatically
- **Fully Accessible**: Optimized for screen readers and blind users
- **Works Offline**: No internet connection needed after initial setup
- **Privacy First**: All processing happens on your device
- **No Subscriptions**: Completely free, no API keys or paid services

## 🚀 Tech Stack

- **React Native** with Expo
- **TensorFlow.js** for on-device machine learning
- **Coco-SSD** model for object detection (90+ object classes)
- **Expo Speech** for text-to-speech
- **Expo Camera** for camera access

## 📱 Screens

1. **Home Screen**: Main landing page with navigation
2. **Camera Screen**: Live camera view with real-time object detection
3. **Settings Screen**: Customize speech and detection settings

## 🎯 Supported Objects

The app can detect 90+ different object classes including:
- People
- Vehicles (car, bicycle, motorcycle, bus, truck, etc.)
- Animals (dog, cat, bird, horse, etc.)
- Indoor objects (chair, couch, table, TV, laptop, etc.)
- Food items (pizza, sandwich, apple, etc.)
- Everyday items (bottle, cup, phone, backpack, etc.)

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS or Android)

### Setup

```bash
# Clone the repository
git clone https://github.com/HusnainActFast/MindM8.git
cd MindM8

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Device

1. Install the **Expo Go** app on your phone:
   - iOS: Download from App Store
   - Android: Download from Google Play

2. Scan the QR code shown in your terminal with:
   - iOS: Camera app
   - Android: Expo Go app

3. The app will load on your phone!

## 🔧 Configuration

### Speech Settings

- **Speech Rate**: 0.5 - 2.0 (default: 1.0)
- **Speech Pitch**: 0.5 - 2.0 (default: 1.0)

### Detection Settings

- **Confidence Threshold**: 30% - 90% (default: 60%)
- **Detection Interval**: 1000ms (1 second)
- **Max Predictions**: 5 objects per detection

## 📁 Project Structure

```
MindM8/
├── App.tsx                 # Main app entry point
├── package.json            # Dependencies
├── app.json               # Expo configuration
├── assets/                # Images and icons
├── components/            # Reusable UI components
│   ├── AccessibleButton.tsx
│   ├── LoadingScreen.tsx
│   └── DetectionDisplay.tsx
├── screens/               # Main app screens
│   ├── HomeScreen.tsx
│   ├── CameraScreen.tsx
│   └── SettingsScreen.tsx
├── hooks/                 # Custom React hooks
│   ├── useCamera.ts
│   ├── useObjectDetection.ts
│   └── useSpeech.ts
├── ml/                    # Machine learning module
│   ├── objectDetection.ts
│   └── README.md
└── utils/                 # Utility functions
    ├── constants.ts
    ├── accessibility.ts
    └── storage.ts
```

## 🎓 How It Works

### Object Detection Pipeline

1. **Camera Capture**: App accesses device camera
2. **Frame Processing**: Captures image frames
3. **ML Inference**: TensorFlow.js processes frames with Coco-SSD model
4. **Results**: Returns detected objects with confidence scores
5. **Announcement**: Text-to-speech announces what was detected

### On-Device AI

- Model runs entirely on your device
- No cloud processing needed
- First launch downloads model (~5-10 MB)
- Model is cached for offline use

## 🔒 Privacy & Security

- **No data collection**: Nothing is sent to external servers
- **No tracking**: No analytics or user tracking
- **Local processing**: All AI runs on your device
- **No API keys**: No third-party services

## ♿ Accessibility Features

- Full screen reader support
- Voice announcements for all actions
- Large, high-contrast buttons
- Semantic HTML/accessibility labels
- Customizable speech settings
- Keyboard navigation support

## 🚀 Future Enhancements

### Planned Features

1. **Text Recognition (OCR)**
   - Read signs, labels, and documents
   - Extract text from images

2. **Scene Understanding**
   - Describe entire scenes, not just objects
   - Context-aware descriptions

3. **Distance Estimation**
   - Approximate distance to objects
   - Spatial awareness

4. **Color Detection**
   - Identify colors of objects
   - Clothing color matching

5. **Smart Glasses Integration**
   - Stream from smart glasses
   - Hands-free operation
   - Bone conduction audio

### Upgrade Options

#### Better Local Models

- **TensorFlow Lite**: Faster mobile inference
- **Custom Models**: Train for specific use cases
- **Hardware Acceleration**: Use device GPU/NPU

#### Cloud AI (When Budget Allows)

⚠️ **Note**: These require API keys and have costs

- **Google Cloud Vision**: $1.50 per 1000 images
- **Amazon Rekognition**: Similar pricing
- **Azure Computer Vision**: Microsoft's alternative
- **Custom Backend**: Deploy your own models

## 🐛 Troubleshooting

### Camera Permission Issues

- Go to Settings > MindM8 > Permissions
- Enable Camera access
- Restart the app

### Model Loading Fails

- Ensure internet connection (first time only)
- Clear app cache
- Restart app

### Poor Detection Accuracy

- Ensure good lighting
- Hold camera steady
- Get closer to objects
- Adjust confidence threshold in Settings

### Slow Performance

- Lower detection frequency in Settings
- Reduce max predictions
- Close other apps

## 📄 License

MIT License - feel free to use this code for your own projects!

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation in `/ml/README.md`

## 🙏 Acknowledgments

- **TensorFlow.js** team for the amazing ML framework
- **Expo** team for the excellent development tools
- **Coco-SSD** model creators
- The accessibility community for feedback and testing

---

**Made with ❤️ for the blind and partially sighted community**

Version 1.0.0 - MVP
