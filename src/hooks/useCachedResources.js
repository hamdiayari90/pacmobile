import Ionicons from "react-native-vector-icons/Ionicons";

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
          'cairo-meduim' : require('../assets/fonts/Cairo-Medium.ttf'),
          'cairo-momo' : require('../assets/fonts/Cairo-Regular.ttf'),
          'KaushanScript' : require('../assets/fonts/KaushanScript-Regular.ttf')

        });
    
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
