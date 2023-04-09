import { ActivityIndicator } from 'react-native'
import React from 'react'
// import user from '../../assets/data/user.json'
import ProfileHeader from './ProfileHeader'
import FeedGridView from '../../components/FeedGridView/FeedGridView'
import { useRoute, useNavigation } from '@react-navigation/native'
import { UserProfileNavigationProp, UserProfileRouteProp, MyProfileNavigationProp, MyProfileRouteProp } from '../../types/navigation';
import {useQuery} from '@apollo/client'
import {getUser} from './queries'
import ApiErrorMessage from '../../components/ApiErrorMessage'
import { GetUserQuery, GetUserQueryVariables } from '../../API'
import { useAuthContext } from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>()

  const navigation = useNavigation<UserProfileNavigationProp | MyProfileNavigationProp>()

  const {userId: authUserId} = useAuthContext();

  const userId = route.params?.userId || authUserId;
  console.log(userId);
  
  
  const {data, loading, error, refetch} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {variables: {id: userId}})

  if(loading){ return <ActivityIndicator/> }
  if(error || !data?.getUser){ //ai remplacé !user par !data?.getUser
    return ( //erreur, pas authorisé a query mon user
    <ApiErrorMessage 
      title="Error fetching the user" 
      message={error?.message || 'User not found'}
      onRetry={()=>refetch()}
    /> )}
  
  const user = data?.getUser

  
  return (
    <FeedGridView 
      data={user.Posts?.items || []} 
      ListHeaderComponent={()=> <ProfileHeader user={user} />}
      refetch={refetch}
      loading={loading}
    />
  )
}

export default ProfileScreen