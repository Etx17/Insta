import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Image } from "react-native";
import etx from '../assets/images/etx.png'
import {HomeStackNavigatorParamsList} from '../types/navigation'
import UpdatePostScreen from "../screens/UpdatePostScreen/UpdatePostScreen";
import PostLikesScreen from "../screens/PostLikesScreen/PostLikesScreen";
const Stack = createNativeStackNavigator<HomeStackNavigatorParamsList>();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen 
                name="Feed" 
                component={HomeScreen} 
                options={{headerTitle: HeaderTitle , headerTitleAlign: 'center'}}
            />

            <Stack.Screen 
                name="UserProfile" 
                component={ProfileScreen} 
                options={{title: 'Profile'}}
            />

            <Stack.Screen 
                name="UpdatePost" 
                component={UpdatePostScreen} 
                options={{title: 'Update Post'}}
            />
             <Stack.Screen 
                name="PostLikes"  
                component={PostLikesScreen} 
                options={{title: 'Post Likes'}}
            />
        </Stack.Navigator>
    )
}
const HeaderTitle = () => {
    return (
       <Image source={etx} resizeMode="contain" style={{width: 150, height: 40}}/>
    )
}
export default HomeStackNavigator;