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
// import InAppBrowser from 'react-native-inappbrowser-reborn'; // cant install the lib without breaking build

// const urlOpener = async (url: string, redirectUrl: string) => {
//   await InAppBrowser.isAvailable();
//   const response = await InAppBrowser.openAuth(url, redirectUrl, {
//     showTitle: false,
//     enableUrlBarHiding: true,
//     enableDefaultShare: false,
//     ephemeralWebSession: false,
//   });

//   if (response.type === 'success') {
//     Linking.openURL(response.url);
//   }
// }

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
