import {View, Text, StyleSheet, ActivityIndicator, Pressable} from 'react-native';
import { useEffect, useState } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useCameraDevices } from 'react-native-vision-camera';
import colors from '../../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const PostUploadScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState('back');
  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      setHasPermissions(cameraPermission === 'authorized' && microphonePermission === 'authorized');
    };
    getPermission()
  }, []);

  
 

  const devices = useCameraDevices()
  const device = devices[cameraType]

  const flipCamera = () => {
    setCameraType(currentCameraType => currentCameraType === 'back' ? 'front' : 'back')
  }

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermissions === false) {
    return <Text>No access to camera</Text>;
  }
  if (device == null) return <ActivityIndicator />
 
  return (
    <View style={styles.page}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
      />
      <View style={[styles.buttonsContainer, {top: 20}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <MaterialIcons name="flash-off" size={30} color={colors.white} />
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 0}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        <View style={styles.circle} />
        <Pressable onPress={flipCamera}>
          <MaterialIcons name="flip-camera-ios" size={30} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black
  },
  camera: {
    width: '100%',
    aspectRatio: 4/4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginHorizontal: 20,
  }
});
export default PostUploadScreen;
