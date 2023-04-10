import { View, Text, Image, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native'
import {useEffect} from 'react'
import colors from '../../theme/colors'
import { DeleteUserMutation, DeleteUserMutationVariables, GetUserQuery, GetUserQueryVariables, UpdateUserInput, UpdateUserMutation, UpdateUserMutationVariables, User } from '../../API'
import {useForm, Controller, Control} from 'react-hook-form'
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react'
import { getUser, updateUser, deleteUser } from './queries'
import { useMutation, useQuery } from '@apollo/client'
import { useAuthContext } from '../../contexts/AuthContext'
import ApiErrorMessage from '../../components/ApiErrorMessage'
import { DEFAULT_USER_IMAGE } from '../../config'
import { useNavigation } from '@react-navigation/native'
import { Auth, Storage } from 'aws-amplify'

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
  const { control, handleSubmit, setValue } = useForm<IEditableUser>();
  const navigation = useNavigation()
  const {userId, user: authUser} = useAuthContext()

  // Get the user
  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {variables: {id: userId}})
  const user = data?.getUser;

  // Update the user
  const [ doUpdateUser, {loading: updateLoading, error: updateError}] = 
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser)

  // Delete the user
  const [ doDelete, {loading: deleteLoading, error: deleteError}] = useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);


  useEffect(() => {
    if(user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('website', user.website);
      setValue('bio', user.bio);
    }
  }, [user, setValue])

  const uploadMedia = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000000);
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];  
      const uniqueName = `${userId}-${timestamp}-${randomNum}.${extension}`;
      const s3Response = await Storage.put(uniqueName, blob)
      return s3Response.key;
    } catch(e) {
      Alert.alert('Error uploading the file', (e as Error).message)
    }
  }
  const onSubmit = async (formData: IEditableUser) => {
    const input: UpdateUserInput = {id: userId, ...formData, _version: user?._version }
    if(selectedPhoto?.uri){
      input.image = await uploadMedia(selectedPhoto.uri)
    }

    await doUpdateUser({variables: { input }})
    navigation.goBack();
  }

  const confirmDelete = () => {
    Alert.alert("Are you sure?", 'Deleting your profile is permanent', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes, delete', style: 'destructive', onPress: startDeleting},
    ])
  }

  const startDeleting = async () => {
    if (!user) {
      return;
    }
    // Delete from DB
    await doDelete({variables: {input: {id: userId, _version: user?._version}}})

    // Delete from Cognito
    authUser?.deleteUser((err) => {
      if(err) { console.log('Error deleting user', err) } 
      Auth.signOut();
    })
  }


  const onChangePhoto = async () => {
    launchImageLibrary(
      {mediaType: 'photo'}, 
      ({didCancel, errorCode, assets}) => {
      if(!didCancel && !errorCode && assets && assets.length > 0){
        setSelectedPhoto(assets[0])
      }
  
    })
  }

  

 

  if(loading || updateLoading || deleteLoading ){ return (<ActivityIndicator/>) }
  if(error || updateError || deleteError){ return <ApiErrorMessage title='Error fetching or updating user' message={error?.message || updateError?.message || deleteError?.message}/> }

  return (
    <View style={styles.page}>
      <Image source={{uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE }} style={styles.avatar} />
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

      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>{updateLoading ? 'Submitting...' : 'Submit'}</Text>
      
      <Text style={styles.textButtonDanger} onPress={confirmDelete}>{deleteLoading ? 'Deleting...' : 'DELETE USER'}</Text>
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
  textButtonDanger: {
    color: colors.error,
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
      minHeight: 50,
  }
})
export default EditProfileScreen;