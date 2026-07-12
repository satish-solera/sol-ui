import { Image, View, Text } from "react-native";
import { Button } from "../ui/button";
import React, { useContext } from "react";
import {
 
  DropdownBody,
  DropdownContent,

  DropdownContext,

  DropdownTrigger,
} from "../ui/dropdown";

export const SimpleDropdown = () => {
    const {open , setValue , setOpen} = useContext(DropdownContext)
  return (
    <View className="flex flex-row gap-5 items-center">
      <DropdownBody   >
        <DropdownTrigger >
            <Text>
                click
            </Text>
        </DropdownTrigger>
        <DropdownContent    options={["India" , "USA"]} />
      </DropdownBody>
    </View>
  );
};
