import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MapPinIcon, StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

export default function RestaurantCard({
    id, imgUrl, title, rating, genre, address, shortDescription, dishes, long, lat
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> 
    navigation.navigate("Restaurant", {id, imgUrl, title, rating, genre, address, shortDescription, dishes, long, lat})
    } className="bg-white mr-3 shadow">
        <Image source={{uri: imgUrl}}
        className="h-36 w-64 rounded-sm"/>

        <View className="px-3 pb-4">
          <Text className="font-bold text-lg pt-2">{title}</Text>
          <View className="flex-row items-center space-x-1">
              <StarIcon fill={"green"}  color="green" opacity={0.5} size={22}/>
              <Text className="text-sm text-gray-500"><Text>{rating}</Text> - {genre}</Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <MapPinIcon color="gray" opacity={0.4} size={22}/>
            <Text className="text-xs text-gray-500">Cercano - {address}</Text>
          </View>
        </View>
    </TouchableOpacity>
  )
}