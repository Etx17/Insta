import { useNavigation } from '@react-navigation/native';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { User } from '../../API';
import { DEFAULT_USER_IMAGE } from '../../config';

interface IUserListItem {
  user: User;
}




const UserListItem = ({user}: IUserListItem) => {

  const navigation= useNavigation();

  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user?.id})
  };

  return (
    <Pressable onPress={goToUserScreen} style={styles.root}>
      <Image source={{uri: user.image || DEFAULT_USER_IMAGE}} style={styles.image} />
      <View>
        <Text  style={styles.name}>{user.name}</Text>
        <Text  style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontWeight: fonts.weight.bold,
    marginBottom: 5,
  },
  username: {
    color: 'grey',
  },

  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
});
export default UserListItem;
