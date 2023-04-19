import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../../features/restaurantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../../features/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { urlFor } from "../../sanity";

export default function BasketScreen() {
  const dispatch = useDispatch();
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

    useMemo(()=>{
        const groupedItems = items.reduce((results, item)=> {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    },[items]);

  return (
    <>
    <StatusBar style="light"/>
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Carrito</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack}
          className="rounded-full absolute top-3 right-5">
            <XCircleIcon fill="#00CCBB" color="white" height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{uri: "https://links.papareact.com/wru"}}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
          <Text className="flex-1">Llega en aproximadamente 50 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Cambiar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items])=> (
            <View className="flex-row items-center space-x-3 bg-white py-2 px-5" key={key}>
              <Text className="text-[#00CCBB]">x{items.length}</Text>
              <Image className="h-12 w-12 rounded-full" source={{uri: urlFor(items[0]?.image).url()}}/>
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">{items[0]?.price}</Text>

              <TouchableOpacity onPress={()=> dispatch(removeFromBasket({id:key}))}>
                <Text className="text-[#00CCBB] text-sm">
                  Quitar
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">${basketTotal}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Costo de delivery</Text>
            <Text className="text-gray-400">$100</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Total</Text>
            <Text className="font-extrabold">${basketTotal+100}</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("PreparingOrder")} className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  );
}
