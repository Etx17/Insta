import { View, StyleSheet} from "react-native";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import CommentsScreen from "./src/screens/CommentsScreen/CommentsScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen/EditProfileScreen";
const App = () => {
  
  return (
    <View style={styles.app}>
      {/* <CommentsScreen/> */}
      {/* <HomeScreen/> */}
      {/* <ProfileScreen/> */}
      <EditProfileScreen/>
    </View>
  )
};
const styles = StyleSheet.create({
  app: {
    flex: 1,
  },

});

export default App;