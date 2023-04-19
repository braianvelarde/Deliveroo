import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import { client, urlFor } from '../sanity';

export default function FeaturedRow({id, title, description}) {
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    client.fetch(`
    *[_type == "featured" && _id == $id]{
      ...,
      restaurants[]->{
        ...,
        category[]->,type->{
          category_name
        },
        dishes[]->{
          ...,
        }
      }
    }[0]
    `, {id}).then(data=>setRestaurants(data?.restaurants));
  }, []);
  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="00CCBB"/>
        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>
        <ScrollView horizontal contentContainerStyle={{paddingHorizontal:15,}} showsHorizontalScrollIndicator={false} className="pt-4">
        {restaurants?.map((restaurant)=> 
          <RestaurantCard 
          key={restaurant._id}
          id={restaurant._id}
          imgUrl={urlFor(restaurant.image).width(500).height(500).url()}
          title={restaurant.restaurant_name}
          rating={restaurant.rating}
          genre={restaurant.type.category_name}
          address={restaurant.address}
          shortDescription={restaurant.short_description}
          dishes={restaurant.dishes}
          long={restaurant.long}
          lat={restaurant.lat}
          />
          )}     
        </ScrollView>
    </View>
  )
}