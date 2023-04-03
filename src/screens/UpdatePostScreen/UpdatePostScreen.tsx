import { View, Text, Image, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { CreateNavigationProp, CreateRouteProp, UpdatePostRouteProp } from '../../types/navigation'
import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import { getPost, updatePost } from './queries'
import { useMutation, useQuery } from '@apollo/client'
import { GetPostQuery, GetPostQueryVariables, UpdatePostMutation, UpdatePostMutationVariables } from '../../API'
import { useAuthContext } from '../../contexts/AuthContext'
import Carousel from '../../components/Carousel'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage'

const UpdatePostScreen = () => {
  const {userId} = useAuthContext()
  const route = useRoute<UpdatePostRouteProp>()
  const [caption, setCaption] = useState('')
  const {id} = route.params
  const {data, loading, error} = useQuery<GetPostQuery, GetPostQueryVariables>(getPost, {variables: {id}})
  const navigation = useNavigation();
  const post = data?.getPost;
  const [doUpdatePost, {error: updateError, data: updateData}] = useMutation<
    UpdatePostMutation, 
    UpdatePostMutationVariables
  >(updatePost)

  useEffect(() => {
    if (post) {
      setCaption(post?.description || '')
    }
  }, [post])

  useEffect(() => { // when the mutation is done, we go back to the HomeStack
    if (updateData) {
      navigation.goBack()
    }
  }, [updateData])

  
  const submit = async () => {
    if(!post){ return }

    try {
      const response = doUpdatePost({ // we do not await here because we want to navigate to the HomeStack before the mutation is done
        variables: {
          input: {
            id: post.id,
            description: caption,
            _version: post._version,
          }
        },
      })
    } catch (error) {
      Alert.alert('Failed to update the post')
    }
  }

  if (loading) return <ActivityIndicator/>
  if (error || updateError ) return <ApiErrorMessage title="Failed to fetch the post" message={error?.message || updateError?.message}/>

  return (
    <View style={styles.root}>
      
     
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
})

export default UpdatePostScreen