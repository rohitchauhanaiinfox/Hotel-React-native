import React from 'react';
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "./presentation/onboarding"; 
import LoginScreen from "./presentation/login";
import OtpScreen from "./presentation/otpscreen";
import DashBoard from "./presentation/navbar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
