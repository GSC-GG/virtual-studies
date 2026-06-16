import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import MenuScreen from './screens/MenuScreen';
import SearchChatScreen from './screens/SearchChatScreen';
import NewChatScreen from './screens/NewChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import InfoScreen from './screens/InfoScreen';
import ContentViewScreen from './screens/ContentViewScreen';
import AddContentScreen from './screens/AddContentScreen';
import ScheduleMeetingScreen from './screens/ScheduleMeetingScreen';
import AddParticipantScreen from './screens/AddParticipantScreen';

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ title: 'Cadastro' }}
          />
          <Stack.Screen
            name='Menu'
            component={MenuScreen}
            options={{ title: 'Painel' }}
          />
          <Stack.Screen
            name='SearchChat'
            component={SearchChatScreen}
            options={{ title: 'Buscar Chat' }}
          />
          <Stack.Screen
            name='NewChat'
            component={NewChatScreen}
            options={{ title: 'Novo Chat' }}
          />
          <Stack.Screen
            name='Chat'
            component={ChatScreen}
            options={{ title: 'Chat' }}
          />
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
            options={{ title: 'Perfil' }}
          />
          <Stack.Screen
            name='Info'
            component={InfoScreen}
            options={{ title: 'Informações' }}
          />
          <Stack.Screen
            name='ContentView'
            component={ContentViewScreen}
            options={{ title: 'Conteúdo' }}
          />
          <Stack.Screen
            name='AddContent'
            component={AddContentScreen}
            options={{ title: 'Adicionar Conteúdo' }}
          />
          <Stack.Screen
            name='ScheduleMeeting'
            component={ScheduleMeetingScreen}
            options={{ title: 'Agendar Reunião' }}
          />
          <Stack.Screen
            name='AddParticipant'
            component={AddParticipantScreen}
            options={{ title: 'Adicionar Participante' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}