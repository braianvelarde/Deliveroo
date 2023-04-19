import { SafeAreaView,View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function PreparingOrderScreen() {
  const animation = useRef(null);
  const spinner = useRef(null);
  const navigation = useNavigation();

  useEffect(()=>{
    setTimeout(()=> {
      navigation.navigate("Delivery")
    },4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <LottieView
      autoPlay
      ref={animation}
      style={{width:200, height:200,}}
      source={require("../../assets/82138-order-delivered.json")}></LottieView>
      <Text className="text-white my-10 font-bold text-center">Esperando que el restaurant acepte tu orden...</Text>
      <LottieView
      autoPlay
      ref={spinner}
      loop
      style={{width:100, height:100,}}
      source={require("../../assets/99878-progress.json")}></LottieView>
    </SafeAreaView>
  );
}
