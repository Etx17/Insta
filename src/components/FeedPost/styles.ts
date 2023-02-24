import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
    post: {
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
      flex: 1,
      marginRight: 3
    },
    text: {
      color: colors.black,
      lineHeight: 18,
    },
    image: {
      width: '100%',
      aspectRatio: 1,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    threeDots: {
       marginLeft: 'auto',
    },
    userName: {
      fontWeight: fonts.weight.bold,
      color: colors.black,
    },
    userAvatar: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 10,
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 5
    },
    icon: {
      marginHorizontal: 5,
    },
    footer: {
      padding: 10,
    }
  });