import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../../sanity";
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from "react-native-heroicons/outline";
import DishRow from "../../components/DishRow";
import BasketPopUp from "../../components/BasketPopUp";
import { useDispatch, useSelector } from "react-redux";
import {  setRestaurant } from "../../features/restaurantSlice";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(()=> {
    navigation.setOptions({headerShown:false});
  }, []);
  
  const {params: {
    id, imgUrl, title, rating, genre, address, shortDescription, dishes, long, lat
  }} = useRoute();

  useEffect(()=> {
    dispatch(setRestaurant({id, imgUrl, title, rating, genre, address, shortDescription, dishes, long, lat}))
  },[dispatch]);


  return (
    <>
    <BasketPopUp/>
    <ScrollView>
    <View className="relative">
      <Image className="h-56 w-full bg-gray-500 p-4" source={{uri: imgUrl}}/>
      <TouchableOpacity onPress={()=> navigation.goBack()} className="bg-gray-100 rounded-full p-2 absolute top-14 left-5" >
        <ArrowLeftIcon color="#00CCBB" size={20}/>
      </TouchableOpacity>
    </View>

    <View className="bg-gray-100">
      <View className="px-4 pt-4 bg-white">
        <Text className="text-3xl font-bold">{title}</Text>
        <View className="space-x-2 my-1 justify-start">
          <View className="flex-row space-x-1 items-center">
            <StarIcon fill="green" color="green" opacity={0.5} size={22}/>
            <Text className="text-xs text-gray-500">
              <Text className="text-green-500">{rating}</Text> - {genre}
            </Text>
          </View>
          <View className="flex-row space-x-1 items-center">
            <MapPinIcon color="gray" opacity={0.4} size={22}/>
            <Text className="text-xs text-gray-500">Cercano - {address}
            </Text>
          </View>
        </View>
        <Text className="text-gray-500 mt-2 pb-4">{shortDescription}</Text>
        <TouchableOpacity className="border-t border-gray-100 p-4 flex-row items-center space-x-2">
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
          <Text className="pl-4 flex-1 text-md font-bold">Sos alérgico a algun alimento?</Text>
          <ChevronRightIcon color="#00CCBB" opacity={0.4} size={20}/>
        </TouchableOpacity>
      </View>
      <View className="pb-36">
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menú</Text>
        {dishes.map((dish)=> (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.dish_name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </View>
    </View>
    </ScrollView>
    </>
  );
}
