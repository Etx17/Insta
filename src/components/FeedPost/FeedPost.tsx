import { Text, View, StyleSheet, Image } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Comment from "../Comment";
import styles from "./styles";
import { IPost } from "../../types/models";

// https://oblador.github.io/react-native-vector-icons/ is the list of icons i can refer

interface IFeedPost {
  post: IPost
};

// Desctructure the post object directly
const FeedPost = ({post}: IFeedPost) => {
  
  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
          <Image source={{uri: post.user.image}} style={styles.userAvatar} />
          <Text style={styles.userName}>{post.user.username}</Text>
          <Entypo name="dots-three-horizontal" size={16} style={styles.threeDots} />
      </View>

      {/* Content */}
      <Image source={{uri: post.image}} style={styles.image} />
    
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
            <AntDesign name={'hearto'} size={24} style={styles.icon} color={colors.black} />
            <Ionicons name="chatbubble-outline" size={24} style={styles.icon} color={colors.black} />
            <Feather name="send" size={24} style={styles.icon} color={colors.black} />
            <Feather name="bookmark" size={24} style={{marginLeft: 'auto'}} color={colors.black} />
        </View>

        {/* Likes */}
        <Text style={styles.text}>Liked by{' '}
            <Text style={styles.bold}>BAM</Text> and{' '}
            <Text style={styles.bold}>{post.nofLikes} others</Text> 
        </Text>

        {/* Post description */}
        <Text style={styles.text}>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          <Text style={styles.text}>{post.description} </Text>
        </Text>

        {/* Comments */}
        <Text>View all {post.nofComments} comments</Text>
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}

        {/* posted date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  )
};

export default FeedPost;

