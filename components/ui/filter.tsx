import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";



type FilterButtons = {
    icon?: React.ReactNode;
    label: string;
}

type AddFilters = {
    icon?: React.ReactNode;
    label: string

}

interface FilterProps {
    filterButtons: FilterButtons[];
    addFilters: AddFilters[]
}


export function Filter({ filterButtons, addFilters }: FilterProps) {
    const [filter, setFilter] = useState(false)
    return (
        <View className="h-36 w-64 shadow-md rounded-xl ">
            <Text className="p-4 font-bold">
                Applied Filters
            </Text>
            <View className="grid grid-cols-3 gap-4 mx-4 ">
                {
                    filterButtons.map((el, id) => (
                        <FilterButton label={el.label} />
                    ))
                }




                <View className=" ml-1">
                    <Pressable onPress={() => setFilter((prev) => !prev)} className={ filter ?  'bg-red-100 p-2 size-8 flex items-center justify-center rounded-md' :`bg-green-100 p-2 size-8 flex items-center justify-center rounded-md`}>
                        {
                            addFilters.length > 0 ? filter ? "x" : '+' : ''
                        }
                    </Pressable>

                    {addFilters.length > 0 && filter && <View className="shadow-md bg-white min-w-28 absolute left-10 top-2 rounded-md p-1">
                        {
                            addFilters.map((el, id) => (
                                <AddFilter label={el.label} />
                            ))
                        }


                    </View>}
                </View>
            </View>
        </View>
    )
}


export const FilterButton = ({ label, icon }: FilterButtons) => {
    return (
        <Pressable className="bg-neutral-100 w-fit p-1 px-4 rounded-md h-fit">
            {
                label
            }
        </Pressable>
    )
}

export const AddFilter = ({ label, icon }: AddFilters) => {
    return (
        <View className="flex flex-row items-center gap-1 justify-between active:bg-neutral-200 p-1 rounded-md">
            <Text>
                {
                    icon
                }
            </Text>
            <Text className=" ">
                {
                    label
                }
            </Text>
            <Pressable className="">+</Pressable>
        </View>
    )
}