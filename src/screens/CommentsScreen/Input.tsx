import { View, Text, Image, TextInput, StyleSheet, Alert } from 'react-native'
import React, {useState} from 'react'
import fonts from '../../theme/fonts'
import colors from '../../theme/colors'
import { useMutation } from '@apollo/client'
import { createComment } from './queries'
import { CreateCommentMutation, CreateCommentMutationVariables } from '../../API'
import { useAuthContext } from '../../contexts/AuthContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IInput {
  postId: string
}

const Input = ({postId}: IInput) => {
  const [newComment, setNewComment] = useState('')
  const {userId} = useAuthContext();
  
  const insets = useSafeAreaInsets();
  const [doCreateComment] = useMutation<
    CreateCommentMutation, 
    CreateCommentMutationVariables
  >(createComment, {refetchQueries: ['CommentsByPost']} )

  const onPost = async () => {
    try {
      await doCreateComment({
        variables: {
          input: {
            comment: newComment,
            userID: userId,
            postID: postId,
          },
        },
      })
    } catch(e) {
      Alert.alert('Could not create comment', (e as Error).message.toString());
    }
    setNewComment('');
  }

  return (
    <View style={[styles.root, {paddingBottom: insets.bottom }]}>
      <Image source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg'}} style={styles.avatar} />   
      <TextInput 
        placeholder="Write your comment" 
        style={styles.input} 
        value={newComment}
        onChangeText={setNewComment}
        multiline
      />
      <Text style={[styles.button, {bottom: insets.bottom + 10}]} onPress={onPost}>POST</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    avatar: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 25,
    },
    root: {
        flexDirection: 'row',
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 5,
        paddingRight: 50,
    },
    button: {
        position: 'absolute',
        right: 15,
        // bottom: 15,
        fontSize: fonts.size.s,
        fontWeight: fonts.weight.full,
        color: colors.primary
    }
})
export default Input