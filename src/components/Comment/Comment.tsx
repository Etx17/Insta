import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { Comment as CommentType} from '../../API';
import { useState } from 'react';
import {DEFAULT_USER_IMAGE} from '../../config'
import dayjs from 'dayjs';
import UserImage from '../UserImage/UserImage';
interface ICommentProps {
    comment: CommentType;
    includeDetails?: boolean;
    isNew?: boolean;
}

const Comment = ({comment, includeDetails = false, isNew = false}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = () => {
    setIsLiked((v) => !v);
  }

  return (
    <View style={styles.comment}>
        { includeDetails && (
          <UserImage imageKey={comment?.User?.image || undefined } width={40}/>
        )}
        <View style={styles.middleColumn}>
          <Text style={styles.commentText}>
              <Text style={styles.bold}>{comment.User?.username}</Text>{' '}
              <Text style={styles.text}>{comment.comment} </Text>
          </Text>
          { includeDetails && (
            <View style={styles.footer}>
              { isNew && <Text style={styles.new}>new</Text>}
              <Text style={styles.footerText}>{dayjs(comment.createdAt).fromNow()} </Text>
              <Text style={styles.footerText}>5 likes </Text>
              <Text style={styles.footerText}>reply</Text>
            </View>
          )}
        </View>
        <Pressable onPress={toggleLike} hitSlop={10}>
          <AntDesign 
          name={isLiked ? 'heart' : 'hearto'} 
          size={12} 
          style={styles.icon} 
          color={isLiked ? colors.accent : colors.black} />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    

    bold: {
      fontWeight: fonts.weight.bold,
    },
    comment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        
      },
      commentText: {
        color: colors.black,
        lineHeight: 18,
      },
      footer: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      footerText: {
        marginRight: 10,
      },

      icon: {
        marginHorizontal: 5,
      },
      middleColumn: {
        flex: 1, //take the rest of the space of the parent
        marginHorizontal: 0,
      },
      new : {
        backgroundColor: colors.primary,
        color: colors.white,
        // fontWeight: fonts.weight.bold,
        marginRight: 5,
        borderRadius: 5,
        oveflow: 'hidden',
        paddingHorizontal: 5
      },

})

export default Comment;