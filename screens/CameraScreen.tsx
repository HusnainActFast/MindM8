/**
 * CameraScreen Component
 * Live camera view with real-time object detection
 * Optimized for accessibility with voice announcements
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useCamera } from '../hooks/useCamera';
import { useObjectDetection } from '../hooks/useObjectDetection';
import { AccessibleButton } from '../components/AccessibleButton';
import { LoadingScreen } from '../components/LoadingScreen';
import { DetectionDisplay } from '../components/DetectionDisplay';
import { announce } from '../utils/accessibility';
import { COLORS, SIZES } from '../utils/constants';

const CameraScreen: React.FC = () => {
  const { hasPermission, isLoading: permissionLoading } = useCamera();
  const {
    isInitialized,
    isDetecting,
    lastDetections,
    error,
    startDetection,
    stopDetection,
    announceLastDetections,
  } = useObjectDetection();

  const [cameraType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    return () => {
      // Cleanup: stop detection when leaving screen
      stopDetection();
    };
  }, [stopDetection]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      announce(error);
    }
  }, [error]);

  const handleStartDetection = async () => {
    if (!isInitialized) {
      announce('Please wait, initializing object detection');
      return;
    }

    announce('Starting object detection');

    // Note: In a full implementation, you would capture frames from the camera
    // and pass them to the detection model. This requires additional setup
    // with expo-gl and image processing. For now, this is a placeholder.

    // TODO: Implement camera frame capture and pass to startDetection
    // This would involve using Camera.takePictureAsync() or expo-gl for real-time frames

    announce(
      'Camera detection ready. In a production app, this would continuously analyze camera frames.'
    );
  };

  const handleStopDetection = () => {
    stopDetection();
    announce('Object detection stopped');
  };

  const handleAnnounceDetections = () => {
    announceLastDetections();
  };

  if (permissionLoading) {
    return <LoadingScreen message="Requesting camera permission..." />;
  }

  if (hasPermission === null) {
    return <LoadingScreen message="Checking camera permissions..." />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text
          style={styles.permissionText}
          accessible={true}
          accessibilityRole="alert"
        >
          Camera permission is required to use this feature. Please enable camera
          access in your device settings.
        </Text>
      </View>
    );
  }

  if (!isInitialized) {
    return <LoadingScreen message="Initializing object detection model..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={cameraType}
          accessible={true}
          accessibilityLabel="Camera viewfinder"
        >
          <View style={styles.overlay}>
            <Text
              style={styles.statusText}
              accessible={true}
              accessibilityLabel={isDetecting ? 'Detection active' : 'Detection inactive'}
            >
              {isDetecting ? '🔴 Detecting...' : '⚪ Ready'}
            </Text>
          </View>
        </Camera>
      </View>

      <View style={styles.controlsContainer}>
        <DetectionDisplay detections={lastDetections} />

        <View style={styles.buttonGroup}>
          {!isDetecting ? (
            <AccessibleButton
              title="Start Detection"
              onPress={handleStartDetection}
              variant="primary"
              accessibilityLabel="Start object detection"
              accessibilityHint="Double tap to begin detecting objects"
            />
          ) : (
            <AccessibleButton
              title="Stop Detection"
              onPress={handleStopDetection}
              variant="danger"
              accessibilityLabel="Stop object detection"
              accessibilityHint="Double tap to stop detecting objects"
            />
          )}

          <AccessibleButton
            title="Announce Objects"
            onPress={handleAnnounceDetections}
            variant="secondary"
            disabled={lastDetections.length === 0}
            accessibilityLabel="Announce detected objects"
            accessibilityHint="Double tap to hear what objects were detected"
          />
        </View>

        <Text
          style={styles.helpText}
          accessible={true}
          accessibilityLabel="Point your camera at objects and tap Start Detection. The app will speak out what it sees."
        >
          Point your camera at objects and tap "Start Detection".{'\n'}
          The app will speak out what it sees.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: SIZES.mediumPadding,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SIZES.smallPadding,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  controlsContainer: {
    backgroundColor: COLORS.background,
    padding: SIZES.mediumPadding,
  },
  buttonGroup: {
    marginVertical: SIZES.smallPadding,
  },
  helpText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: SIZES.smallPadding,
    fontStyle: 'italic',
  },
  permissionText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    padding: SIZES.mediumPadding,
  },
});

export default CameraScreen;
