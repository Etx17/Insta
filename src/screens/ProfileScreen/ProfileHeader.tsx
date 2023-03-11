import { View, Text, Image } from 'react-native'
import React from 'react'
import user from '../../assets/data/user.json'
import styles from './styles'
import Button from '../../components/Button'

const ProfileHeader = () => {
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
              onPress={() => console.warn('Pressed')}
              />
              <Button 
              text="Another Button" 
              onPress={() => console.warn('Pressed')}
              />
          </View>
  
          
  
      </View>
    )
  }

  export default ProfileHeader;