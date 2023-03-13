import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import instalogo from '../assets/images/instalogo.png';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import RootNavigatorParamsList from './types'


const Stack = createNativeStackNavigator<RootNavigatorParamsList>();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: true}} >

                <Stack.Screen 
                    name="Home" 
                    component={BottomTabNavigator} 
                    options={{headerShown: false}} 
                />

               <Stack.Screen
                    name="Comments"
                    component={CommentsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default Navigation;