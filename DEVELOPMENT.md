# MindM8 Development Guide

## Getting Started with Development

### Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run on web
npm run web
```

## Architecture Overview

### Component Hierarchy

```
App
├── NavigationContainer
    └── Stack.Navigator
        ├── HomeScreen
        ├── CameraScreen
        └── SettingsScreen
```

### Data Flow

1. **Hooks** manage state and side effects
2. **Components** render UI and handle user interaction
3. **Utils** provide helper functions
4. **ML Module** handles object detection

## Key Files Explained

### App.tsx
Main entry point. Sets up navigation and routes.

### Screens

#### HomeScreen.tsx
- Landing page with app info
- Navigation to Camera and Settings
- Accessibility announcements on load

#### CameraScreen.tsx
- Camera view with live detection
- Detection controls (start/stop)
- Real-time object display
- Voice announcements

#### SettingsScreen.tsx
- Speech customization (rate, pitch)
- Detection settings (confidence threshold)
- Model information
- Reset functionality

### Hooks

#### useCamera.ts
- Manages camera permissions
- Permission request flow
- Status tracking

#### useObjectDetection.ts
- Initializes ML model
- Continuous detection loop
- Single-shot detection
- Announcement integration

#### useSpeech.ts
- Text-to-speech management
- Custom rate and pitch
- Speaking state tracking

### ML Module

#### objectDetection.ts
- TensorFlow.js initialization
- Coco-SSD model loading
- Detection inference
- Model information

### Utils

#### constants.ts
- App-wide constants
- Color scheme
- Detection settings
- Accessibility labels

#### accessibility.ts
- Text-to-speech helpers
- Announcement formatting
- Screen reader utilities

#### storage.ts
- AsyncStorage wrapper
- Settings persistence
- Load/save preferences

## Adding New Features

### Adding a New Screen

1. Create screen component in `/screens/`
2. Add route type in `App.tsx`
3. Add screen to Stack.Navigator
4. Create navigation buttons in relevant screens

Example:
```typescript
// In App.tsx
export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Settings: undefined;
  NewScreen: { param: string }; // Add this
};

// In Stack.Navigator
<Stack.Screen
  name="NewScreen"
  component={NewScreen}
  options={{ title: 'New Screen' }}
/>
```

### Adding a New ML Model

1. Install model package:
```bash
npm install @tensorflow-models/your-model
```

2. Create new detection function in `/ml/`:
```typescript
import * as yourModel from '@tensorflow-models/your-model';

export const initializeYourModel = async () => {
  // Load model
};

export const detectWithYourModel = async (image: any) => {
  // Run inference
};
```

3. Create custom hook in `/hooks/`:
```typescript
export const useYourModel = () => {
  // Hook logic
};
```

4. Integrate in screen

### Adding Settings

1. Add constant to `/utils/constants.ts`
2. Add storage functions to `/utils/storage.ts`:
```typescript
export const saveSetting = async (value: any) => {
  await AsyncStorage.setItem('@key', value.toString());
};

export const getSetting = async () => {
  const value = await AsyncStorage.getItem('@key');
  return value ? parse(value) : defaultValue;
};
```

3. Add UI in `SettingsScreen.tsx`

## Performance Optimization

### Object Detection

- **Reduce frequency**: Increase detection interval
- **Lower max predictions**: Process fewer results
- **Increase threshold**: Filter low-confidence results
- **Use lighter model**: Switch to lite_mobilenet_v2

### Camera

- **Lower resolution**: Reduce camera resolution
- **Optimize frame capture**: Skip frames if needed
- **Debounce detection**: Avoid overlapping detections

### Memory

- **Dispose tensors**: Clean up TensorFlow.js tensors
- **Clear intervals**: Stop detection loops properly
- **Unsubscribe**: Clean up event listeners

## Testing

### Manual Testing Checklist

- [ ] Camera permission request works
- [ ] Camera preview displays correctly
- [ ] Object detection initializes
- [ ] Detections are announced via speech
- [ ] Settings save and load correctly
- [ ] Navigation works between all screens
- [ ] App handles permission denial gracefully
- [ ] App works offline after first launch

### Accessibility Testing

- [ ] All buttons have accessibility labels
- [ ] Screen reader announces all actions
- [ ] Navigation is logical with VoiceOver/TalkBack
- [ ] Focus order makes sense
- [ ] All images have alt text
- [ ] Color contrast is sufficient

## Debugging

### Enable Debug Mode

```typescript
// In App.tsx or relevant file
const DEBUG = true;

if (DEBUG) {
  console.log('Debug info:', data);
}
```

### Common Issues

**Camera not working**
- Check permissions in app.json
- Verify Camera.requestCameraPermissionsAsync()
- Test on physical device (cameras don't work in simulator)

**Model fails to load**
- Check internet connection (first time)
- Verify TensorFlow.js is initialized
- Check console for specific errors

**Speech not working**
- Verify device volume is up
- Check Speech.isSpeakingAsync()
- Test on physical device

## Building for Production

### iOS

```bash
# Build for iOS
expo build:ios

# Or with EAS Build
eas build --platform ios
```

### Android

```bash
# Build APK
expo build:android

# Or with EAS Build
eas build --platform android
```

### Publishing Updates

```bash
# Publish over-the-air update
expo publish

# Or with EAS Update
eas update
```

## Code Style

- Use TypeScript for type safety
- Use functional components with hooks
- Follow React Native best practices
- Add accessibility props to all interactive elements
- Comment complex logic
- Use meaningful variable names

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

## Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [TensorFlow.js Docs](https://www.tensorflow.org/js)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

## Next Steps for MVP+

1. **Implement real camera frame capture**
   - Use expo-gl for real-time processing
   - Process camera frames continuously
   - Optimize for battery life

2. **Add more ML models**
   - Text recognition (OCR)
   - Scene classification
   - Face detection (with privacy controls)

3. **Enhance accessibility**
   - Haptic feedback
   - Custom gesture controls
   - Voice commands

4. **Improve UX**
   - Onboarding tutorial
   - Help screens
   - Feedback mechanism

5. **Performance**
   - Benchmark detection speed
   - Optimize model loading
   - Reduce app size

6. **Testing**
   - Unit tests
   - Integration tests
   - User testing with blind users

---

Happy coding! 🚀
