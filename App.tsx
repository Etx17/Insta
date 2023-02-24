import { Text, View } from "react-native";
import colors from "./src/theme/colors";
import fonts from "./src/theme/fonts";
import AntDesign from "react-native-vector-icons/AntDesign";
// https://oblador.github.io/react-native-vector-icons/ is the list of icons i can refer
const App = () => {
  return (
    <View>
      <Text style={{color: colors.primary, fontSize: fonts.size.lg}}>
        Hello
        <AntDesign name="stepforward" size={30} color={colors.primary} />
      </Text>

    </View>
  )
};

export default App;