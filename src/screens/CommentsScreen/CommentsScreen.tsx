import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import comments from '../../assets/data/comments.json'
// import models from '../../types/models'
import Comment from '../../components/Comment/Comment'
import Input from './Input'
const CommentsScreen = () => {

  return (
    <View style={{flex: 1}}>
      <FlatList 
        data={comments}
        renderItem = {({item}) => <Comment comment={item} includeDetails={true}/>}  
        style={{padding: 10}}
      />
      <Input />
    </View>
  )
}
const styles = StyleSheet.create({
    
})
export default CommentsScreen