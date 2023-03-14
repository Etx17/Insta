import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import {Authenticator, withAuthenticator} from '@aws-amplify/ui-react-native';
import AuthContextProvider from './src/contexts/AuthContext'
Amplify.configure(awsconfig)

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};
// customize theme
// export default withAuthenticator(App);
export default App;
