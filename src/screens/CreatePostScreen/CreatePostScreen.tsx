import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native'
import {useRoute} from '@react-navigation/native'
import { CreateRouteProp } from '../../types/navigation'
import React, { useState } from 'react'
import Button from '../../components/Button'
import { createPost } from './queries'
import { useMutation } from '@apollo/client'
import { CreatePostMutation, CreatePostMutationVariables } from '../../API'
import { useAuthContext } from '../../contexts/AuthContext'

const CreatePostScreen = () => {
  const {userId} = useAuthContext()
    const route = useRoute<CreateRouteProp>()
    const image = route.params.image
    //  equivalent destructuré : {image} = route.params
    const [caption, setCaption] = useState('')
    const [doCreatePost] = useMutation<
      CreatePostMutation, 
      CreatePostMutationVariables>
      (createPost)
    
    const submit = async () => {
      try {
        const response = await  doCreatePost({
          variables: {
            input: {
              description: caption,
              image,
              nofComments: 0,
              nofLikes: 0,
              userID: userId,
              _version: 1,
            }
          },
        })
        console.log(response)
      } catch (e) {
        Alert.alert('Error', (e as Error).message)
      }
      
      // export type CreatePostInput = {
      //   id?: string | null,
      //   description?: string | null,
      //   image?: string | null,
      //   images?: Array< string > | null,
      //   nofComments: number,
      //   nofLikes: number,
      //   userID: string,
      //   _version?: number | null,
      // };
    }


  return (
    <View style={styles.root}>
      
      <Image source={{uri: image}} style={styles.image} />
      <TextInput 
        value={caption}
        onChangeText={setCaption}
        placeholder="Write a caption..." 
        style={styles.input} 
        multiline 
        numberOfLines={5}
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
})

export default CreatePostScreen