import { Image, FlatList } from 'react-native'
import React from 'react'
import user from '../../assets/data/user.json'
import ProfileHeader from './ProfileHeader'
import FeedGridView from '../../components/FeedGridView/FeedGridView'
import { useRoute, useNavigation } from '@react-navigation/native'
import { 
  UserProfileNavigationProp, 
  UserProfileRouteProp, 
  MyProfileNavigationProp, 
  MyProfileRouteProp
} from '../../navigation/types';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>()
  const navigation = useNavigation<UserProfileNavigationProp | MyProfileNavigationProp>()

  const userId = route.params?.userId
  // query the user with userID

  return (
    <FeedGridView 
      data={user.posts} 
      ListHeaderComponent={ProfileHeader}
    />
  )
}

export default ProfileScreen