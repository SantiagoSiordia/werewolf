import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { FC, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header, HomeScreen, LandingScreen, SettingsScreen } from "./src/features";

const Tab = createBottomTabNavigator();

const App: FC = () => {

  const [ isLanding, setIsLanding ] = useState<boolean>(true);

  if(isLanding) return <LandingScreen setIsLanding={setIsLanding} />

  return (
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
  );
}

export default App;