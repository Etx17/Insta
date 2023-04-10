import { View, Text, Image } from 'react-native'
import React from 'react'
import { Post } from '../../API'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const FeedGridItem = ({post}: {post: Post}) => {
  // J'ai unpost, je veux downloader l'image et l'afficher
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  
  return (
    <View style={{flex: 1, maxWidth: "33.33%", aspectRatio: 1, padding: 1}}>
      <Image source={{uri: post.image || post.images?.[0]}} style={{flex: 1}} />
      {
        post.images && (
            <MaterialIcons name="collections" size={16} color="white" style={{position: 'absolute', top: 5, right: 5}} />
        )
      }

    </View>
  )
}

export default FeedGridItem;