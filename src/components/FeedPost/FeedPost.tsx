import { Text, View, StyleSheet, Image } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./styles";

// https://oblador.github.io/react-native-vector-icons/ is the list of icons i can refer
const FeedPost = () => {
  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
          <Image source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg '}} style={styles.userAvatar} />
          <Text style={styles.userName}>Etienne</Text>
          <Entypo name="dots-three-horizontal" size={16} style={styles.threeDots} />
      </View>

      {/* Content */}
      <Image source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg '}} style={styles.image} />
    
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
            <Text style={styles.bold}>66 others</Text> 
        </Text>

        {/* Post description */}
        <Text style={styles.text}>
          <Text style={styles.bold}>Etienne</Text>{' '}
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nisl nec leo ultricies lacinia. Sed sed nisl nec leo ultricies lacinia. </Text>
        </Text>

        {/* Comments */}
        <Text>View all 16 comments</Text>
        <View style={styles.comment}>
          <Text style={styles.commentText}>
            <Text style={styles.bold}>Valoute75</Text>{' '}
            <Text style={styles.text}>C'est super joli, t'es en vacances au Canada ? On se voit à Vancouver! </Text>
          </Text>
          <AntDesign name={'hearto'} size={12} style={styles.icon} color={colors.black} />
        </View>

        {/* posted date */}
        <Text>24 january, 2023</Text>
      </View>
    </View>
  )
};

export default FeedPost;

