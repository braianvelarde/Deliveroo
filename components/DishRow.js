import { View, Text, Image, TouchableOpacity } from "react-native";
import React, {  useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from "../features/basketSlice";

export default function DishRow({id, name, description, price, image}) {
    const [isPressed, setIsPressed] = useState();
    const dispatch = useDispatch();
    const items = useSelector(state =>selectBasketItemsWithId(state, id));
    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}))
    }
    const removeItemFromBasket = () => {
        if(!items.length > 0) return
        dispatch(removeFromBasket({id}))
    }
    return (<>
    <TouchableOpacity onPress={()=> setIsPressed(!isPressed)} className={`bg-white border border-gray-200 p-4 ${isPressed && "border-b-0"}`}>
        <View className="flex-row">
            <View className="flex-1 pr-2">
                <Text className="text-lg mb-1">{name}</Text>
                <Text className="text-gray-400">{description}</Text>
                <Text className="text-gray-400 mt-2">${price}</Text>
            </View>
            <Image style={{borderWidth:1, borderColor:"gray"}} className="h-20 w-20 mt-2 bg-gray-300 p-4 rounded" source={{uri: urlFor(image).url()}} />
        </View>
    </TouchableOpacity>
    {isPressed && (
        <View className="px-4 bg-white">
            <View className="flex-row items-center space-x-2 py-3">
                <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                    <MinusCircleIcon fill={items.length > 0 ? "#00CCBB" : "gray"} color="white" size={40}/>
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon fill="#00CCBB" color="white" size={40}/>
                </TouchableOpacity>
            </View>
        </View>
    )
    }
    </>
  );
}
