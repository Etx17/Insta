import {View, Text, StyleSheet} from 'react-native';
import { useEffect } from 'react';
import Button from '../../components/Button';
import { Camera } from 'react-native-vision-camera';
const PostUploadScreen = () => {

  // get permissions at the mounting of the component in the useEffect hook
  
  return (
    <View style={{flex: 1}}>
      
    </View>
  );
};
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'black'
  },
});
export default PostUploadScreen;
