import React, { useState, useEffect } from 'react';
import {RouterNames} from '../config/RouterNames';
import { Home, Tasks, Habits, AddTask, AddHabit, Onboarding } from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNav from './TabNav';
import { StorageService } from '../services/storageService';
import CustomAppBar from '../components/CustomAppBar';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await StorageService.getOnboardingCompleted();
      setIsOnboardingCompleted(completed);
    } catch (error) {
      console.error('Onboarding durumu kontrol edilirken hata:', error);
      setIsOnboardingCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: ({ route, options, navigation }) => {
          if (options.headerShown) {
            // Check if we can go back (not the initial route)
            // For Stack navigator, all screens except the initial one can go back
            const canGoBack = navigation.canGoBack() && route.name !== RouterNames.TabNav;
            return (
              <CustomAppBar 
                title={options.title || route.name} 
                showLogo={true}
                canGoBack={canGoBack}
              />
            );
          }
          return null;
        },
        headerStyle: {
          backgroundColor: '#817E87',
        },
        headerTintColor: '#FFFFFF',
      }}
      initialRouteName={isOnboardingCompleted ? RouterNames.TabNav : RouterNames.Onboarding}
    >
      <Stack.Screen name={RouterNames.Onboarding} component={Onboarding} />
      <Stack.Screen name={RouterNames.Home} component={Home} />
      <Stack.Screen 
        name={RouterNames.Tasks} 
        component={Tasks} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: "Görevler",
          header: () => (
            <CustomAppBar 
              title="Görevler" 
              showLogo={true}
              canGoBack={navigation.canGoBack()}
            />
          ),
        })}
      />
      <Stack.Screen 
        name={RouterNames.Habits} 
        component={Habits} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: "Alışkanlıklar",
          header: () => (
            <CustomAppBar 
              title="Alışkanlıklar" 
              showLogo={true}
              canGoBack={navigation.canGoBack()}
            />
          ),
        })} 
      />
      <Stack.Screen 
        name={RouterNames.AddTask} 
        component={AddTask} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: "Görev Ekle",
          header: () => (
            <CustomAppBar 
              title="Görev Ekle" 
              showLogo={true}
              canGoBack={navigation.canGoBack()}
            />
          ),
        })} 
      />
      <Stack.Screen 
        name={RouterNames.AddHabit} 
        component={AddHabit} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: "Alışkanlık Ekle",
          header: () => (
            <CustomAppBar 
              title="Alışkanlık Ekle" 
              showLogo={true}
              canGoBack={navigation.canGoBack()}
            />
          ),
        })} 
      />
      <Stack.Screen name={RouterNames.TabNav} component={TabNav} />
    </Stack.Navigator>
  );
};
export default StackNav;