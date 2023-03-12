import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import instalogo from '../assets/images/instalogo.png';

const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Feed" screenOptions={{headerShown: true}}>
                <Stack.Screen 
                    name="Feed" 
                    component={HomeScreen}
                    options={{ headerTitle: () => <HeaderTitle />, headerTitleAlign: 'center' }}
                />
                <Stack.Screen 
                    name="UserProfile" 
                    component={ProfileScreen} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const HeaderTitle = () => {
    return (
       <Image source={instalogo} resizeMode="contain" style={{width: 150, height: 40}}/>
    )
}

export default Navigation;