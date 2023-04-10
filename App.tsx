// import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import AuthContextProvider from './src/contexts/AuthContext'
import Client from './src/apollo/Client';
import { MenuProvider } from 'react-native-popup-menu';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjs from 'dayjs';
dayjs.extend(relativeTime);


Amplify.configure(awsconfig);

const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthContextProvider>
          <Client>
            <Navigation />
          </Client>
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};
// customize theme
// export default withAuthenticator(App);
export default App;
