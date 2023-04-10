import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigationProp } from '../../types/navigation';
import { Auth, Storage } from 'aws-amplify'
import { User } from '../../API'
import { DEFAULT_USER_IMAGE } from '../../config';
import { useAuthContext } from '../../contexts/AuthContext';
import UserImage from '../../components/UserImage/UserImage';

interface IProfileHeader {
    user: User;

}
const ProfileHeader = ({user}: IProfileHeader) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const {userId} = useAuthContext();
    const navigation = useNavigation<ProfileNavigationProp>();
    const navigateToEditProfileScreen = () => {
        navigation.navigate("EditProfile")
    }

    useEffect(() => {
        if(user.image){
            Storage.get(user?.image).then(setImageUri); // By using .then, no need to use async/await, and we assign the result to setImageUri
        }
    }, [user])
    
    return (
      <View style={styles.root}>
          {/* Header Row */}
          <View style={styles.headerRow}>
              {/* Profile Image */}
              <UserImage imageKey={user.image} width={100}/>
              {/* Posts, Follower, Following NUmber */}
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{user.nofPosts}</Text>
                  <Text>Posts</Text>
              </View>
  
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{user.nofFollowers}</Text>
                  <Text>Followers</Text>
              </View>
  
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{user.nofFollowings}</Text>
                  <Text>Following</Text>
              </View>
          </View>
  
          {/* Name */}
          <Text style={styles.name}>{user.name}</Text>
  
          {/* Bio */}
          <Text style={styles.bio}>{user.bio}</Text>
  
          {/* Edit Profile Button */}
          {userId === user.id && (
            <View style={styles.buttonsContainer}>
                <Button 
                    text="Edit Profile" 
                    onPress={() => navigateToEditProfileScreen()}
                    inline
                />
                <Button text="Log Out" onPress={() => Auth.signOut()} inline />
            </View>
          )}
            
      </View>
    )
  }

  export default ProfileHeader;