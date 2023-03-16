import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import user from '../../assets/data/user.json'
import colors from '../../theme/colors'
import { User } from '../../API'
import {useForm, Controller, Control} from 'react-hook-form'
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react'
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<User, IEditableUserField>

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({control, label, name, multiline, rules={}}: ICustomInput) => (
  <Controller 
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      
      return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={{flex: 1}}>
        <TextInput 
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={label}
            style={[styles.input, {borderColor: error ? 'red' : colors.lightgrey}]} 
            multiline={multiline}

          />
          {error && <Text style={{color: 'red'}}>{error.message || "Error"}</Text>}
        </View>
      </View>
    )}}
  />

  
)

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null)
  const {
    control, 
    handleSubmit, 
    formState: {errors}
  } = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user.website,
      bio: user.bio,
    }
  });

  const onSubmit = (data: IEditableUser) => {
    console.log('Submit', data)
  }

  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'}, 
      ({didCancel, errorCode, assets}) => {
      if(!didCancel && !errorCode && assets && assets.length > 0){
        setSelectedPhoto(assets[0])
      }
    })}

  return (
    <View style={styles.page}>
      <Image source={{uri: selectedPhoto?.uri || user.image}} style={styles.avatar} />
      <Text style={styles.textButton} onPress={onChangePhoto}> Change profile photo </Text>

      <CustomInput 
        name="name" 
        control={control} 
        label="Name" 
        rules={{required: "Name is required"}}  
      />

      <CustomInput 
        name="username" 
        control={control} 
        label="Username" 
        rules={{
          required: "Username is required", 
          minLength: {value: 3, message: "Username should be more than 3 characters"}
        }}  
      />

      <CustomInput 
        name="website" 
        control={control} 
        label="Website" 
        rules={{
          required: "Website is required",
          pattern: {
            value: URL_REGEX,
            message: "Website should be a valid URL"
          }
        }}
      />

      <CustomInput 
        name="bio" 
        control={control} 
        label="Bio" 
        multiline 
        rules={{ 
          maxLength: {
            value: 200, 
            message: "Bio should be less than 200 characters"
            }
          }}
      />

      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>Submit</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'center'
  },
  profilePictureContainer: {
      alignItems: 'center',
      padding: 10
  },
  avatar: {
      width: "33%",
      aspectRatio: 1,
      borderRadius: 200,
      
  },
  textButton: {
      color: colors.primary,
      fontWeight: 'bold',
      fontSize: 16,
      margin: 10,
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
  },
  label: {
    fontSize: 16,
    width: 80,
  },
  input: {
      color: colors.black,
      fontSize: 16,
      borderColor: colors.lightgrey,
      borderBottomWidth: 1,
  }
})
export default EditProfileScreen;