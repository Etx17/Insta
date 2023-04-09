import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Menu, MenuOptions, MenuTrigger, MenuOption, renderers } from 'react-native-popup-menu'
import Entypo from 'react-native-vector-icons/Entypo';
import { deletePost } from './queries';
import { useMutation } from '@apollo/client';
import { DeletePostMutation, DeletePostMutationVariables, Post } from '../../API';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { FeedNavigationProp } from '../../types/navigation';

// Si je veux utiliser des props, il faut utiliser une interface pour déclarer leur types
interface IPostMenu {
  post: Post;
}

const PostMenu = ({post}: IPostMenu) => {
  const navigation = useNavigation<FeedNavigationProp>();
  const {userId} = useAuthContext()
  const isMyPost = post.userID === userId;
  // Definir la mutation
  const [doDeletePost] = useMutation<
    DeletePostMutation, 
    DeletePostMutationVariables
  >(deletePost, {variables: {
      input: {
        id: post.id,
        _version: post._version,
      }
    }
  });

  const onDeleteOptionPressed = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: startDeletingPost,
      },
    ]);
  };

  const onEditOptionPressed = () => {
    navigation.navigate('UpdatePost', {id: post.id});
  }
 
  const startDeletingPost = async ()  => {
    try {
      const response = await doDeletePost(); // J'aurais pu définir ici les options de variables aussi
    } catch (error) {
      Alert.alert('Could not delete post');
    }
  };

  return (
    <Menu renderer={renderers.SlideInMenu}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} style={styles.threeDots} />
      </MenuTrigger>
      <MenuOptions>

        <MenuOption onSelect={() => Alert.alert(`Reporting`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>

        {isMyPost && (
        <>
          <MenuOption onSelect={onDeleteOptionPressed} >
            <Text style={[styles.optionText, {color: 'red'}]}>Delete</Text>
          </MenuOption>

          <MenuOption onSelect={onEditOptionPressed}>
            <Text style={styles.optionText}>Edit</Text>  
          </MenuOption> 
        </>
        )}
      </MenuOptions>
    </Menu>
  )
}

const styles = StyleSheet.create({
  threeDots: {
    marginLeft: 'auto',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },

})

export default PostMenu