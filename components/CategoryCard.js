import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function CategoryCard({imgUrl, title}) {
  return (
    <TouchableOpacity className="relative mr-2 h-20 w-20">
      <Image source={{uri: imgUrl}} className="rounded absolute w-full h-full"/>
      <LinearGradient className="rounded absolute w-full h-full opacity-50" colors={['transparent', '#000000']}></LinearGradient>
      <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
    </TouchableOpacity>
  )
}