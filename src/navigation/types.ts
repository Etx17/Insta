import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootNavigatorParamsList = {
    Home: undefined, 
    Comments: {postId: string}
}

export type BottomTabNavigatorParamsList = {
    HomeStack: undefined
    Search: undefined
    Upload: undefined
    Notifications: undefined
    MyProfile: undefined
};

export type MyProfileNavigationProp = BottomTabNavigationProp<
    BottomTabNavigatorParamsList,
    'MyProfile'
>;

export type MyProfileRouteProp = RouteProp<
BottomTabNavigatorParamsList,
    'MyProfile'
>;

export type HomeStackNavigatorParamsList = {
    Feed: undefined
    UserProfile: {userId: string}
}

export type UserProfileNavigationProp = NativeStackNavigationProp<
    HomeStackNavigatorParamsList,
    'UserProfile'
>;

export type UserProfileRouteProp = RouteProp<
    HomeStackNavigatorParamsList,
    'UserProfile'
>;


export type FeedNavigationProp = NativeStackNavigationProp<
    HomeStackNavigatorParamsList,
    'Feed'
>;

export type ProfileStackNavigatorParamsList = {
    Profile: undefined
    EditProfile: undefined
}

export type ProfileNavigationProp = NativeStackNavigationProp<
    ProfileStackNavigatorParamsList,
    'Profile'
>;