import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "../screens/CameraScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import {ProfileStackNavigatorParamsList, UploadStackNavigationParamsList} from '../types/navigation'


const Stack = createNativeStackNavigator<UploadStackNavigationParamsList>();
const UploadStackNavigator = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen name="Camera" component={CameraScreen} options={{headerShown: false}} />
            <Stack.Screen name="Create" component={CreatePostScreen} />
        </Stack.Navigator>
    )
}

export default UploadStackNavigator;