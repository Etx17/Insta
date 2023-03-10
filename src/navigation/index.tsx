import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import instalogo from '../assets/images/instalogo.png';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import {RootNavigatorParamsList} from '../types/navigation'
import AuthStackNavigator from './AuthStackNavigator';
import { useAuthContext } from '../contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';


const Stack = createNativeStackNavigator<RootNavigatorParamsList>();

const linking: LinkingOptions<RootNavigatorParamsList> = {
    prefixes: ['etxnative://', 'https://etxnative.com'],
    config: {
        initialRouteName: 'Home',
        screens: {
            Comments: 'comments', // etxnative://comments
            Home: {
                screens: {
                    Homestack: {
                        initialRouteName: 'Feed',
                        screens: {
                            UserProfile: 'user/:userId',
                        }
                    }
                }
            }
        } 
    }
}

const Navigation = () => {

    const {user} = useAuthContext();

    if(user === undefined) {
        return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
        </View>
        )
    }

    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator screenOptions={{headerShown: true}} >

                {!user ? (
                    <Stack.Screen 
                        name="Auth" 
                        component={AuthStackNavigator} 
                        options={{headerShown: false}} 
                    />
                ) : (
                    <>
                      <Stack.Screen 
                          name="Home" 
                          component={BottomTabNavigator} 
                          options={{headerShown: false}} 
                      />
                      <Stack.Screen
                          name="Comments"
                          component={CommentsScreen}
                      />
                    </>

                )}

                
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default Navigation;