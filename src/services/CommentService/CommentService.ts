import { CreateCommentMutation, CreateCommentMutationVariables, GetPostQuery, GetPostQueryVariables, Post, UpdatePostMutation, UpdatePostMutationVariables } from '../../API'
import { useMutation, useQuery,  } from '@apollo/client'
import { updatePost, createComment, getPost } from './queries'
import { useAuthContext } from '../../contexts/AuthContext'
import { Alert } from 'react-native'

const useCommentService = (postId: string) => {
  const {userId} = useAuthContext();
  
  const {data: postData} = useQuery<
    GetPostQuery, 
    GetPostQueryVariables
  >(getPost, {variables: {id: postId}});

  const post = postData?.getPost

  const [doUpdatePost] = useMutation<
    UpdatePostMutation, 
    UpdatePostMutationVariables
  >(updatePost);

  const [doCreateComment] = useMutation<
    CreateCommentMutation, 
    CreateCommentMutationVariables
  >(createComment) //, {refetchQueries: ['CommentsByPost']} ) We dont need it anymore as we have live data with subscriptions

  const incrementNofComments = (amount: 1 | -1) => {
    if(!post) {
      Alert.alert('Failed to load post', 'Please try again later')
      return
    };
    doUpdatePost(
      { variables :{
        input: {
          id: post.id,
          _version: post._version,
          nofComments: post.nofComments + amount,
        },
      },
    });
  };

  const onCreateComment = async (newComment: string) => {
    if(!post) {
      Alert.alert('Failed to load post', 'Please try again later')
      return
    };
    try {
      await doCreateComment({
        variables: {
          input: {
              userID: userId,
              postID: post.id,
              comment: newComment,
          },
        },
      })
      incrementNofComments(1);
    } catch(e) {
      Alert.alert('Could not create comment', (e as Error).message.toString());
    }
  }

  

  return {
    onCreateComment,
  }
}

export default useCommentService;