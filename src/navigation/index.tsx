import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import instalogo from '../assets/images/instalogo.png';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();
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
                    name="UserProfile" 
                    component={ProfileScreen} 
                    options={{title: 'Profile'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default Navigation;