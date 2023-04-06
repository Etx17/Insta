import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { CreateNavigationProp, CreateRouteProp } from '../../types/navigation'
import React, { useState } from 'react'
import Button from '../../components/Button'
import { createPost } from './queries'
import { useMutation } from '@apollo/client'
import { CreatePostMutation, CreatePostMutationVariables } from '../../API'
import { useAuthContext } from '../../contexts/AuthContext'
import Carousel from '../../components/Carousel'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'

const CreatePostScreen = () => {
  const {userId} = useAuthContext()
  const route = useRoute<CreateRouteProp>()
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
          uri: image,
        }}
        style={styles.image}
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
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            type: "POST",
            description: caption,
            image,
            images, 
            video,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
            _version: 1,
          }
        },
      })
      console.log(response)
      navigation.popToTop(); //So that it goes back to the first screen of the UploadStack
      navigation.navigate('HomeStack')
    } catch (e) {
      Alert.alert('Error', (e as Error).message)
    }
  }


  return (
    <View style={styles.root}>
      
      <View style={styles.content}>{content}</View>
      <TextInput 
        value={caption}
        onChangeText={setCaption}
        placeholder="Write a caption..." 
        style={styles.input} 
        multiline 
        numberOfLines={2}
      />

      <Button text='Submit' onPress={submit}/>
    </View>
  )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 200,
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