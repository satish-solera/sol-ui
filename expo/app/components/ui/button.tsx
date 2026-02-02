import React from "react";
import { Pressable , PressableProps,  StyleSheet , ViewProps} from "react-native";

type ButtonProps = PressableProps & ViewProps & {
    className ? : string,
}

export const Button = ({children , ...props}: ButtonProps) =>{
    return(
        <Pressable style={[style.button , props.style]} {...props}>
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