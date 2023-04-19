import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { client, urlFor } from '../sanity';

export default function Categories() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    client.fetch(`
    *[_type == "category"]{
      ...
    }`).then(data=>setCategories(data));

  }, []);


  return (
    <ScrollView
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    >
      {
        categories?.map((category) => 
          <CategoryCard key={category._id} id={category._id} imgUrl={urlFor(category.image).width(500).height(500).url()} title={category.category_name}/>
        )
      }
    </ScrollView>
  )
}