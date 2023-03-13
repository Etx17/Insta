import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserSearchScreen from '../screens/UserSearchScreen/UserSearchScreen';
import colors from '../theme/colors';
import { SearchTabTabNavigatorParamsList } from '../types/navigation';

const Tab = createMaterialTopTabNavigator<SearchTabTabNavigatorParamsList>();

const SearchTabNavigator = () => {

const insets = useSafeAreaInsets(); //for iphone notch and android cutouts

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {paddingTop: insets.top}, 
      tabBarIndicatorStyle: {backgroundColor: colors.black}
    }}>
        <Tab.Screen name="Users" component={UserSearchScreen} />
        <Tab.Screen name="Posts" component={CommentsScreen} />

    </Tab.Navigator>
  );
}

export default SearchTabNavigator;