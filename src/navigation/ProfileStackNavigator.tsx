import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import {ProfileStackNavigatorParamsList} from '../types/navigation'

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamsList>();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen 
                name="UserProfile" 
                component={ProfileScreen} 
                options={{title: 'Profile'}}
            />

            <Stack.Screen 
                name="EditProfile" 
                component={EditProfileScreen} 
            />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator;