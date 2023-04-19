import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../../features/restaurantSlice";
import MapView, {Marker} from 'react-native-maps';

export default function DeliveryScreen() {
  const progressbar = useRef();
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1">
      <View className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30}/>
          </TouchableOpacity>
          <Text className="text-white font-light text-lg">Ayuda</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
          <View>
            <Text className="text-lg text-gray-400">Llegada estimada</Text>
            <Text className="text-4xl font-bold">50 min</Text>
          </View>
          <Image className="h-20 w-20" source={{uri: "https://links.papareact.com/fls"}}/>
          </View>
        <LottieView
      autoPlay
      ref={progressbar}
      loop
      style={{width:15, height:15, backgroundColor:"white"}}
      source={require("../../assets/66863-progress-bar.json")}/>
      <Text className=" mt-3 text-gray-500">Tu pedido en {restaurant.title} se está preparando</Text>
        </View>
      </View>
      <MapView
          initialRegion={{latitude:restaurant.lat, longitude:restaurant.long, latitudeDelta:0.005, longitudeDelta:0.005}}
          className="flex-1 z-0 -mt-10"
          >
            <Marker
            coordinate={{latitude:restaurant.lat, longitude:restaurant.long}}
                title={restaurant.title}
                description={restaurant.short_description}
                identifier="origin"
                pinColor="#00CCBB"
                      />
          </MapView>
          <SafeAreaView className="bg-white flex-row items-center space-x-5 h-20">
            <Image className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5" source={{uri:"https://links.papareact.com/wru"}}/>
          <View className="flex-1">
            <Text className="text-lg">Braian Velarde</Text>
            <Text className="text-gray-400">Tu delivery</Text>
          </View>
          <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Llamar</Text>
          </SafeAreaView>
    </SafeAreaView>
  );
}
