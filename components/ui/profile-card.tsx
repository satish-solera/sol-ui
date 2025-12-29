import { Image, View, Text, Pressable } from "react-native"

type Profile = {
    src: string;
    title: string;
    subTitle: string;
    buttonLabel?: string
}


export function ProfileCard({ src, title, subTitle, buttonLabel = "Added" }: Profile) {
    return (
        <View className="w-60 h-52  rounded-xl flex items-center py-5 shadow-md">
            <View className="rounded-full size-14 bg-black my-2">
                <Image src={src} className="object-cover" />
            </View>
            <Text className="font-medium text-xl">
                {
                    title
                }
            </Text>
            <Text className="text-neutral-500">
                {
                    subTitle
                }
            </Text>
            <Pressable className="bg-green-300 w-fit p-2 my-4 rounded-xl ">
                {
                    buttonLabel
                }
            </Pressable>
        </View>
    )
}