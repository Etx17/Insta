import {useEffect, useState} from 'react';
import { View, Text, LayoutAnimation, Image, Pressable } from 'react-native';
import colors from '../../theme/colors';
import Comment from '../Comment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useNavigation } from '@react-navigation/native';
import {  Post } from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config'
import { FeedNavigationProp } from '../../types/navigation';
import PostMenu from './PostMenu';
import useLikeService from '../../services/LikeService/LikeService';
import dayjs from 'dayjs';
import Content from './Content';
import { Storage } from 'aws-amplify';
import UserImage from '../UserImage/UserImage';

interface IFeedPost {
  post: Post
  isVisible: boolean;
}

const FeedPost = ({post, isVisible}: IFeedPost) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const {toggleLike, isLiked} = useLikeService(post);
  const postLikes = post.Likes?.items.filter(like => !like?._deleted) || [];
  const navigation = useNavigation<FeedNavigationProp>();

  useEffect(() => {
    if(post?.User?.image){
        Storage.get(post.User.image).then(setImageUri); // By using .then, no need to use async/await, and we assign the result to setImageUri
    }
}, [post])

  const navigateToUser = () => {
    if(post.User){
      navigation.navigate('UserProfile', {userId: post.User.id});
    }
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  const navigateToLikes = () => {
    navigation.navigate('PostLikes', {id: post.id})
  }

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(existingValue => !existingValue);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  return (
    <View style={styles.post}>
      
      {/* Header */}
      <View style={styles.header}>
        <UserImage imageKey={post?.User?.image || undefined }  />
        <Text onPress={navigateToUser} style={styles.userName}>{post.User?.username}</Text>
        <PostMenu post={post}/>
            
      </View>

      {/* Content */}
      <DoublePressable onDoublePress={toggleLike}>
        <Content post={post} isVisible={isVisible}/>
      </DoublePressable>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>

          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />

          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        {/* Likes */}
        {postLikes.length === 0 ? <Text>Be the first to like this post</Text> : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username} </Text> 
            {postLikes.length > 1 && (
              <>
                and{' '}
                <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            ) }
          </Text>
        )}

        {/* Post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>

        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text onPress={navigateToComments}>View all {post.nofComments} comments</Text>
        {(post.Comments?.items || []).map(comment => (
          comment && <Comment key={comment.id} comment={comment} />
        ))}

        {/* Posted date */}
        <Text>{dayjs(post.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
