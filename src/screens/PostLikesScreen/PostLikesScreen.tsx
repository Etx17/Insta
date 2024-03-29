import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { likesForPostByUser } from './queries';
import { useQuery } from '@apollo/client';
import { LikesForPostByUserQuery, LikesForPostByUserQueryVariables } from '../../API';
import { PostLikesRouteProp } from '../../types/navigation';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import UserListItem from '../../components/UserListItem/UserListItem';

const PostLikesScreen = () => {
    const route = useRoute<PostLikesRouteProp>();
    const {id} = route.params; // id du post
    const {data, loading, error, refetch} = useQuery<
        LikesForPostByUserQuery, 
        LikesForPostByUserQueryVariables
    >(likesForPostByUser, {variables: {postID: id }});

    if (loading) { return <ActivityIndicator/> }
    if (error) { return <ApiErrorMessage title='Error fetching likes' message={error.message}/> }

    const likes = data?.likesForPostByUser?.items.filter(like => !like?._deleted) || []; 
    return (
        <FlatList 
            data={likes}
            renderItem={({item}) => <UserListItem user={item?.User} />}
            refreshing={loading}
            onRefresh={refetch}
        />
     
    )
}

export default PostLikesScreen