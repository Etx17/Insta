import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
// import comments from '../../assets/data/comments.json'
// import models from '../../types/models'
import Comment from '../../components/Comment/Comment'
import Input from './Input'
import { useRoute } from '@react-navigation/native'
import { CommentsRouteProp, CreateCommentRouteProp } from '../../types/navigation'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { commentsByPost, onCreateCommentByPostId } from './queries'
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage'
import { CommentsByPostQuery, 
  CommentsByPostQueryVariables, 
  ModelSortDirection, 
  OnCreateCommentByPostIdSubscription, 
  OnCreateCommentByPostIdSubscriptionVariables,  
  Comment as CommentType
} from '../../API'

const CommentsScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const postId = route.params?.postId;
  const [comments, setComments] = useState([])
  const [newComments, setNewComments] = useState<CommentType[]>([])
  
  // Query comments of post
  const {data, loading, error, fetchMore} = useQuery<
        CommentsByPostQuery,
        CommentsByPostQueryVariables
    >(commentsByPost, {variables: {postID: postId, sortDirection: ModelSortDirection.DESC, limit: 15 }});
  

  // Subscription 
  const { data: newCommentsData} = useSubscription<
    OnCreateCommentByPostIdSubscription,
    OnCreateCommentByPostIdSubscriptionVariables
  >(onCreateCommentByPostId, {variables: {postID: postId}});
  


  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    if(data){
      const commentsFetched = (data?.commentsByPost?.items || []).filter( comment => !comment?._deleted )
      setComments(commentsFetched)
  }}, [data])

  const nextToken = data?. commentsByPost?.nextToken;

  useEffect(() => {
    if(newCommentsData?.onCreateCommentByPostId){
      setNewComments((existingNewComments) => [
        newCommentsData.onCreateCommentByPostId as CommentType,
         ...existingNewComments
      ])
    }
  }, [newCommentsData])

  const loadMore = async () => {
    if(!nextToken || isFetchingMore){
      return 
    }
    setIsFetchingMore(true)
    await fetchMore({ variables: { nextToken } })

    setIsFetchingMore(false)
  }

  const isNewComment = (comment: CommentType) => {
    return newComments.some(newComment => newComment.id === comment.id)
  }

  if (loading) { return <ActivityIndicator/> }
  if (error) { return <ApiErrorMessage title='Error fetching likes' message={error.message}/> }

  return (
    <View style={{flex: 1}}>
      <FlatList 
        data={[...newComments, ...comments]} // reemplacer ca par les comments de la query
        renderItem = {({item}) => item && <Comment comment={item} includeDetails={true} isNew={isNewComment(item)}/>}  
        style={{padding: 10}}
        ListEmptyComponent={<Text>No comments yet</Text>}
        onEndReached={() => loadMore()}
      />
      <Input postId={postId}/>
    </View>
  )
}
const styles = StyleSheet.create({
    
})
export default CommentsScreen