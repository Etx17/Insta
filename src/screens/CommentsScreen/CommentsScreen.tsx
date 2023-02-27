import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import comments from '../../assets/data/comments.json'
// import models from '../../types/models'
import Comment from '../../components/Comment/Comment'
import Input from './Input'
const CommentsScreen = () => {
    // Commencer par coder la liste des commentaires dans une vue scrollable
        // Créer le composant commentaire adéquat
        // Le rendre en Fatlist verticale
            // importer les props

    // Séparer le footer de la liste des commentaires
        // Créer le composant footer
        // 

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