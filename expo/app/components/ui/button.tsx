import React from "react";
import { Pressable , PressableProps,  StyleSheet } from "react-native";

type ButtonProps = PressableProps & {
    className ? : string,
}

export const Button = ({children , ...props}: ButtonProps) =>{
    return(
        <Pressable style={style.button} {...props}>
                {
                    children
                }
        </Pressable>
    )
}


const style = StyleSheet.create({
button:{
    borderWidth: 0.5,
    borderColor: "gray" ,
    borderRadius: 10,
    width: "auto",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10, 
}
})