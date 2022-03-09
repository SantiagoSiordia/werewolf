import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { FC, useState } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Header, HomeScreen, LandingScreen, SettingsScreen, store } from "./src/features";

const queryClient = new QueryClient()

const Tab = createBottomTabNavigator();

const App: FC = () => {

  const [ isLanding, setIsLanding ] = useState<boolean>(true);

  if(isLanding) return <LandingScreen setIsLanding={setIsLanding} />

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaProvider>
              <NavigationContainer>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    header: () => <Header route={route} />,
                    tabBarStyle: {
                      backgroundColor: "black"
                    },
                    tabBarActiveTintColor: '#42b4ff',
                    tabBarInactiveTintColor: 'white',
                  })}
                  >
                  <Tab.Screen options={() => ({
                    tabBarIcon: ({ focused }) => {
                      if(focused) return <Icon name='home' color="#42b4ff" size={24} />
                      return <Icon name='home-outline' color="white" size={24} />
                    },
                  })} name="State of the game" component={HomeScreen} />
                  <Tab.Screen options={() => ({
                    tabBarIcon: ({ focused }) => {
                      if(focused) return <Icon name='ios-settings' color="#42b4ff" size={24} />
                      return <Icon name='ios-settings-outline' color="white" size={24} />
                    },
                  })} name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
              </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;