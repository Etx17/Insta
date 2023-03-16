import { View, Text, Image } from 'react-native'
import React from 'react'
import user from '../../assets/data/user.json'
import styles from './styles'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigationProp } from '../../types/navigation';
import { Auth } from 'aws-amplify'
const ProfileHeader = () => {
    const navigation = useNavigation<ProfileNavigationProp>();
    const navigateToEditProfileScreen = () => {
        navigation.navigate("EditProfile")
    }
    console.log(user.image);
    
    return (
      <View style={styles.root}>
          {/* Header Row */}
          <View style={styles.headerRow}>
              {/* Profile Image */}
              <Image source={{uri: user.image}} style={styles.avatar}></Image>
              {/* Posts, Follower, Following NUmber */}
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>98</Text>
                  <Text>Posts</Text>
              </View>
  
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>498</Text>
                  <Text>Followers</Text>
              </View>
  
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>398</Text>
                  <Text>Following</Text>
              </View>
          </View>
  
          {/* Name */}
          <Text style={styles.name}>{user.name}</Text>
  
          {/* Bio */}
          <Text style={styles.bio}>{user.bio}</Text>
  
          {/* Edit Profile Button */}
          <View style={styles.buttonsContainer}>
              <Button 
                text="Edit Profile" 
                onPress={() => navigateToEditProfileScreen()}
                inline
              />
              <Button 
                text="Log Out" 
                onPress={() => Auth.signOut()}
                inline
              />
          </View>
      </View>
    )
  }

  export default ProfileHeader;