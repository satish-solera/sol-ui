import React from "react";
import { View } from "react-native";
import MoneyCheckout from "../components/ui/money-checkout";


export default function FilterDemo() {
    return (
        <View className='flex items-center justify-center min-h-screen'>
          <MoneyCheckout money={399} nameOfReceiver="Satish Solera"/>
        </View>
    )
}