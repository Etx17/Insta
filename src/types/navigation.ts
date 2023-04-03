import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootNavigatorParamsList = {
    Home: undefined, 
    Comments: {postId: string},
    Auth: undefined,
}

export type BottomTabNavigatorParamsList = {
    HomeStack: undefined
    Search: undefined
    Upload: undefined
    Notifications: undefined
    MyProfile: undefined
};

export type SearchTabTabNavigatorParamsList = {
    Users: undefined
    Posts: undefined
};

export type UploadStackNavigationParamsList = {
  Camera: undefined
  Create: {
    image?: string;
    images?: string[];
    video?: string;
  }
};

export type CreateRouteProp = RouteProp<
  UploadStackNavigationParamsList,
 'Create'
 >;

 export type CreateNavigationProp = RouteProp<
  UploadStackNavigationParamsList,
 'Create'
 >;

export type CameraNavigationProp = NativeStackNavigationProp<
    UploadStackNavigationParamsList,
    'Camera'
>

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
    UpdatePost: {postId: string}
}

export type UpdatePostRouteProp = RouteProp<
    HomeStackNavigatorParamsList,
    'UpdatePost'
>;

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

// Auth Stack Navigator
export type AuthStackNavigatorParamList = {
    'Sign in': undefined;
    'Sign up': undefined;
    'Confirm email': {username?: string};
    'Forgot password': undefined;
    'New password': undefined;
  };
  
  export type SignInNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'Sign in'
  >;
  
  export type SignUpNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'Sign up'
  >;
  
  export type ConfirmEmailNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'Confirm email'
  >;
  export type ConfirmEmailRouteProp = RouteProp<
    AuthStackNavigatorParamList,
    'Confirm email'
  >;
  
  export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'Forgot password'
  >;
  
  export type NewPasswordNavigationProp = NativeStackNavigationProp<
    AuthStackNavigatorParamList,
    'New password'
  >;
  