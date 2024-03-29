import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { CreateNavigationProp, CreateRouteProp } from '../../types/navigation'
import React, { useState } from 'react'
import Button from '../../components/Button'
import { createPost } from './queries'
import { useMutation } from '@apollo/client'
import { CreatePostInput, CreatePostMutation, CreatePostMutationVariables } from '../../API'
import { useAuthContext } from '../../contexts/AuthContext'
import Carousel from '../../components/Carousel'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { Storage } from 'aws-amplify'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const CreatePostScreen = () => {
  const {userId} = useAuthContext()
  const route = useRoute<CreateRouteProp>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {image, images, video} = route.params
  const [caption, setCaption] = useState('')
  const [doCreatePost] = useMutation<
    CreatePostMutation, 
    CreatePostMutationVariables>
    (createPost)
  const navigation = useNavigation<CreateNavigationProp>();
  
  let content;
 
  if (image) { /// HERE
    content = (
      <Image
        source={{
          uri: image.startsWith('/data') ?  `file://${image}` : image,
        }}
        style={styles.image}
        resizeMode={'cover'}
      />
    );
  } else if (images) {
    content = <Carousel images={images} onDoublePress={() => {}} />;
  } else if (video){
    content = (
        <VideoPlayer uri={video} paused={true}/>
    )
  }

  const submit = async () => {
    if(isSubmitting) return;
    setIsSubmitting(true);

    const input: CreatePostInput = {
      type: "POST",
      description: caption,
      image: undefined,
      images: undefined, 
      video: undefined,
      nofComments: 0,
      nofLikes: 0,
      userID: userId,
      _version: 1,
    }
    // upload to storage and get the key 
    if(image){
      const imageKey = await uploadMedia(image);
      input.image = imageKey;
      console.log(input.image)
    } else if (images){
      const imagesKeys = await Promise.all(images.map(img =>uploadMedia(img)))
      input.images = imagesKeys.filter(key => key !== undefined) as string[];
    }
    try {
      await doCreatePost({ variables: { input }})

      setIsSubmitting(false);
      navigation.popToTop(); //So that it goes back to the first screen of the UploadStack
      navigation.navigate('HomeStack')
    } catch (e) {
      Alert.alert('Error', (e as Error).message)
      setIsSubmitting(false);
    }
  }

  const uploadMedia = async (uri: string) => {
    try {
      
      const response = await fetch(uri);
      const blob = await response.blob();

      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000000);

      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];
      
      const uniqueName = `${userId}-${timestamp}-${randomNum}.${extension}`;
   
      const s3Response = await Storage.put(uniqueName, blob)

      return s3Response.key;
    } catch(e) {
      Alert.alert('Error uploading the file', (e as Error).message)
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
      
      <View style={styles.content}>{content}</View>
      <TextInput 
        value={caption}
        onChangeText={setCaption}
        placeholder="Write a caption..." 
        style={styles.input} 
        multiline 
        numberOfLines={2}
      />

      <Button text={isSubmitting ? 'Submitting...' : 'Submit'} onPress={submit}/>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: "100%",
        aspectRatio: 1
    },
    input: {
      alignSelf: 'stretch', // prend toute la largeur de l'écran
      margin: 10,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
    },
    content: {
      width: '100%',
      aspectRatio: 1,
      margin: 10,
    }
})

export default CreatePostScreen