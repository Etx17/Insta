import {View, Text, StyleSheet, ActivityIndicator, Pressable} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useCameraDevices } from 'react-native-vision-camera';
import colors from '../../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { CameraNavigationProp } from '../../types/navigation';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const CameraScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState('back');
  const [flash, setFlash] = useState('off');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false)
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<CameraNavigationProp>();
  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      setHasPermissions(cameraPermission === 'authorized' && microphonePermission === 'authorized');
    };
    getPermission()
  }, []);

  const camera = useRef<Camera>(null)
  const devices = useCameraDevices()
  const device = devices[cameraType]

  // const navigateToCreate = () => {
  //   navigation.navigate('Create', {
  //     images:[
  //      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg",
  //      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg"
  //     ]})
  // }

  const flipCamera = () => {
    setCameraType(currentCameraType => currentCameraType === 'back' ? 'front' : 'back')
  }

  const toggleFlash = () => {
    setFlash(currentFlash => currentFlash === 'off' ? 'on' : 'off')
  }

  const takePicture = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takeSnapshot({
        quality: 0.5,
      });
      console.log(photo.path, 'this is from takePicture');
      // navigateToCreate();
      navigation.navigate('Create', { image: photo.path});
    }

    if(device == null) {
      console.log('no device')
    }
  }
  const startRecording = async () => {
    console.warn('start recording')
    setIsRecording(true)
    if (camera.current !== null) {
      try {
      const video = await camera.current.startRecording({
        onRecordingFinished: (video) => console.log(video, 'this is from startRecording'),
        onRecordingError: (error) => console.error(error),

      }); } catch (error) {
        console.log(error)
      }
      setIsRecording(false)
    }

    if(device == null) {
      console.log('no device')
    }
  }
  const stopRecording = async () => {
    console.warn('stop recording')
    setIsRecording(false)
    if (camera.current !== null) {
      const video = await camera.current.stopRecording();
    }
  }

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo'}, 
      ({didCancel, errorCode, assets}) => {
      if(!didCancel && !errorCode && assets && assets.length > 0){
        if (assets.length === 1) {
          navigation.navigate('Create', { image: assets[0].uri, });
        }
      }
  })}

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
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        video={true}
      />
      <View style={[styles.buttonsContainer, {top: inset.top + 20}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={toggleFlash}>
          <MaterialIcons name={flash === "on" ? "flash-on" : "flash-off"} size={30} color={colors.white} />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 0}]}>
        <Pressable onPress={openImageGallery}>
          <MaterialIcons name="photo-library" size={30} color={colors.white} />
        </Pressable>

        <Pressable onPress={takePicture} >
          <View style={[styles.circle, {backgroundColor: isRecording ? colors.accent : colors.white }]} />
        </Pressable>
       
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
export default CameraScreen;
