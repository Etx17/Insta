import { Image, FlatList } from 'react-native'
import React from 'react'
import user from '../../assets/data/user.json'
import ProfileHeader from './ProfileHeader'
import FeedGridView from '../../components/FeedGridView/FeedGridView'
import { useRoute, useNavigation } from '@react-navigation/native'
const ProfileScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()

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