import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import RestaurantScreen from './screens/Restaurant/RestaurantScreen';
import 'react-native-url-polyfill/auto';
import {Provider} from 'react-redux';
import store from './store';
import BasketScreen from './screens/Basket/BasketScreen';
import PreparingOrderScreen from './screens/OrderScreen/PreparingOrderScreen';
import DeliveryScreen from './screens/Delivery/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
        <Stack.Screen name="Basket" component={BasketScreen} options={{presentation:"modal", headerShown:false}}/>
        <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{presentation:"fullScreenModal", headerShown:false}}/>
        <Stack.Screen name="Delivery" component={DeliveryScreen} options={{presentation:"fullScreenModal", headerShown:false}}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
  );
}