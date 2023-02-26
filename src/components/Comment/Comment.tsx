import { View, Text, StyleSheet, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { IComment } from '../../types/models';

interface ICommentProps {
    comment: IComment
}

const Comment = ({comment}: ICommentProps) => {
    
  return (
    <View style={styles.comment}>
        <Image source={{uri: comment.user.image}} style={styles.avatar} />
        <View style={styles.middleColumn}>
          <Text style={styles.commentText}>
              <Text style={styles.bold}>{comment.user.username}</Text>{' '}
              <Text style={styles.text}>{comment.comment} </Text>
          </Text>
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d </Text>
            <Text style={styles.footerText}>5 likes </Text>
            <Text style={styles.footerText}>reply</Text>
          </View>
        </View>
        <AntDesign name={'hearto'} size={12} style={styles.icon} color={colors.black} />
    </View>
  )
}

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 25,
    },

    bold: {
      fontWeight: fonts.weight.bold,
    },
    comment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      commentText: {
        color: colors.black,
        marginHorizontal: 5,
        lineHeight: 18,
      },
      footer: {
        flexDirection: 'row',
      },
      footerText: {
   
        marginHorizontal: 5,
      },

      icon: {
        marginHorizontal: 5,
      },
      middleColumn: {
        flex: 1, //take the rest of the space of the parent
        marginHorizontal: 5,
      },

})

export default Comment;