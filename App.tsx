import { View, StyleSheet, ScrollView} from "react-native";
import FeedPost from "./src/components/FeedPost/FeedPost";
// https://oblador.github.io/react-native-vector-icons/ is the list of icons i can refer
const App = () => {
  return (
    <ScrollView style={styles.app}>
      <FeedPost />
      <FeedPost />
    </ScrollView>
  )
};
const styles = StyleSheet.create({
  app: {
    flex: 1,
  },

});

export default App;