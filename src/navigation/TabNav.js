import {Image, StyleSheet, Text, View} from 'react-native';
import Icons from '../config/Icons';
import { Home, AddHabit, AddTask, Statistics } from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomAppBar from '../components/CustomAppBar';

const Tab = createBottomTabNavigator();

export default MyTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarShowLabel: false,
        header: ({ route, options, navigation }) => {
          if (options.headerShown !== false) {
            // Tab navigator içinde geri butonu gerekmez, sadece Stack navigator'da
            const canGoBack = false; // Tab navigator'da geri butonu göstermiyoruz
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
      }}
    >
      <Tab.Screen
        name="Ana Sayfa"
        component={Home}
        options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', marginVertical: 5}}>
              <Image
                style={{
                  marginVertical: 5,
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#AED89D' : '#748c94',
                }}
                source={Icons.home}></Image>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Alışkanlık Ekle" 
        component={AddHabit} 
        options={{
        tabBarIcon:({focused})=>(
          <View style={{alignItems: 'center', marginVertical: 5}}>
          <Image
            style={{
              marginVertical: 5,
              width: 30,
              height: 30,
              tintColor: focused ? '#AED89D' : '#748c94',
            }}
            source={Icons.habit}></Image>
        </View>  
        ),
      }}/>
      <Tab.Screen 
        name="Görev Ekle" 
        component={AddTask} 
        options={{
        tabBarIcon:({focused})=>(
          <View style={{alignItems: 'center', marginVertical: 5}}>
          <Image
            style={{
              marginVertical: 5,
              width: 30,
              height: 30,
              tintColor: focused ? '#AED89D' : '#748c94',
            }}
            source={Icons.clipboard}></Image>
        </View>  
        ),
      }}/>
      <Tab.Screen 
        name="İstatistikler" 
        component={Statistics} 
        options={{
          headerShown: true,
          title: "İstatistikler",
          tabBarIcon:({focused})=>(
            <View style={{alignItems: 'center', marginVertical: 5}}>
            <Image
              style={{
                marginVertical: 5,
                width: 30,
                height: 30,
                tintColor: focused ? '#AED89D' : '#748c94',
              }}
              source={Icons.graph}></Image>
          </View>  
          ),
        }}/>

     
    </Tab.Navigator>
  );
};