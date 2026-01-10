import React from "react";
import { View } from "react-native";
import { Button, InfoBadge } from "./components";
import ProfileCard from "./components/ui/profile-card";


export default function ProfileCardDemo() {
    return (
        <View className='flex items-center justify-center min-h-screen'>
           <ProfileCard src="../../src/assests/imagr7.jpg" subTitle='@sol-auth' title='Satish' />
        </View>
    )
}