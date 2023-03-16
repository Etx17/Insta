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
  
  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {variables: {id: userId}})

  if(loading){ return <ActivityIndicator/> }
  if(error){ return <ApiErrorMessage title="Error fetching the user" message={error?.message || 'User not found'}/> }
  console.log(data?.getUser, 'data getUser')
  const user = data?.getUser
  return (
    <FeedGridView 
      data={user.Posts?.items || []} 
      ListHeaderComponent={()=> <ProfileHeader user={user} />}
    />
  )
}

export default ProfileScreen