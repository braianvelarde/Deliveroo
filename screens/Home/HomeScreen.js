import { Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon} from "react-native-heroicons/outline";
import Categories from '../../components/Categories';
import FeaturedRow from '../../components/FeaturedRow';
import {client} from '../../sanity';

export default function HomeScreen(){
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);
    

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [])

    useEffect(() => {
      client.fetch(`
      *[_type == "featured"]{
        ...,
        restaurants[]->
      }`).then(data=>setFeaturedCategories(data));
    }, []);

    return (
      <SafeAreaView className="bg-white pt-4">
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 rounded-full"
          ></Image>

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Haz tu pedido!</Text>
            <Text className="font-bold text-xl">Ubicación Actual
            <ChevronDownIcon size={20} color="#00CCBB"/>
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB"/>
        </View>
        {/* Searchbar */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-4">
            <MagnifyingGlassIcon color="gray" size={20}/>
            <TextInput keyboardType='default' placeholder='Restaurantes y rotiserias'></TextInput>
          </View>
            <AdjustmentsVerticalIcon/>
        </View>
        {/* Body */}
        <ScrollView className="bg-gray-100" 
        contentContainerStyle={{
          paddingBottom: 100
        }}>
          {/* Categories */}
          <Categories/>
          {/* Featured rows */}
          {featuredCategories?.map((category)=> (
            <FeaturedRow 
              key={category._id}
              id={category._id}
              title={category.featured_name}
              description={category.short_description}
            />
         ) )}
        </ScrollView>
      </SafeAreaView>
    )
}