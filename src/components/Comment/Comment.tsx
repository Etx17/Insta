import { View, Text, StyleSheet } from 'react-native'
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
        <Text style={styles.commentText}>
            <Text style={styles.bold}>{comment.user.username}</Text>{' '}
            <Text style={styles.text}>{comment.comment} </Text>
        </Text>
        <AntDesign name={'hearto'} size={12} style={styles.icon} color={colors.black} />
    </View>
  )
}

const styles = StyleSheet.create({
    comment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      commentText: {
        color: colors.black,
        flex: 1,
        marginRight: 3
      },
      text: {
        color: colors.black,
        lineHeight: 18,
      },
      bold: {
        fontWeight: fonts.weight.bold,
      },
      icon: {
        marginHorizontal: 5,
      },
})

export default Comment;