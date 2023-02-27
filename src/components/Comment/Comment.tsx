import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { IComment } from '../../types/models';
import { useState } from 'react';
interface ICommentProps {
    comment: IComment;
    includeDetails: boolean;
}

const Comment = ({comment, includeDetails = false}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = () => {
    setIsLiked((v) => !v);
  }

  return (
    <View style={styles.comment}>
        { includeDetails && (
          <Image source={{uri: comment.user.image}} style={styles.avatar} />
        )}
        <View style={styles.middleColumn}>
          <Text style={styles.commentText}>
              <Text style={styles.bold}>{comment.user.username}</Text>{' '}
              <Text style={styles.text}>{comment.comment} </Text>
          </Text>
          { includeDetails && (
            <View style={styles.footer}>
              <Text style={styles.footerText}>2d </Text>
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
    avatar: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 25,
        marginRight: 5,
    },

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

})

export default Comment;