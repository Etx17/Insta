import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Image } from "react-native";
import instalogo from "../assets/images/instalogo.png";
import {HomeStackNavigatorParamsList} from '../types/navigation'
import UpdatePostScreen from "../screens/UpdatePostScreen/UpdatePostScreen";
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
        </Stack.Navigator>
    )
}
const HeaderTitle = () => {
    return (
       <Image source={instalogo} resizeMode="contain" style={{width: 150, height: 40}}/>
    )
}
export default HomeStackNavigator;