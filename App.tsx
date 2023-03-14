import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import {Authenticator, withAuthenticator} from '@aws-amplify/ui-react-native';
Amplify.configure(awsconfig)

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};
// customize theme
// export default withAuthenticator(App);
export default App;
