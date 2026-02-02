import * as React from "react";

import {
  FlatList,
  Pressable,
  PressableProps,
  Text,
  View,
  ViewProps,
  StyleSheet,
} from "react-native";

type DropdownBodyProps = ViewProps & {
  className?: string;
};
type DropdownContentProps = ViewProps & {
  className?: string;
  options: any[];
};
type DropdownTriggerProps = ViewProps &
  PressableProps & {
    className?: string;
  };

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
};

export const Dropdown = ({
  label,
  value,
  options,
  onSelect,
}: DropdownProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <View className="relative">
      <Text className="text-sm mx-1">{label}</Text>
      <Pressable
        className="border border-black/20 py-2 px-3 rounded-md "
        onPress={() => setVisible((prev) => !prev)}
      >
        <Text>{value}</Text>
      </Pressable>

      <View className={`${visible ? "block" : "hidden"} relative `}>
        <Pressable
          onPress={() => setVisible(false)}
          className="absolute left-10 right-0 z-20 w-40  "
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                className="bg-white border border-black/10 rounded-lg py-2 w-40 my-0.5 "
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
              >
                <Text className="mx-5">{item}</Text>
              </Pressable>
            )}
          />
        </Pressable>
      </View>
    </View>
  );
};



export const DropdownContext = React.createContext(null);



// dropdownBody
export const DropdownBody = ({
  className,
  children,
  
  ...props
}: DropdownBodyProps) => {
    const [value , setValue ] = React.useState("select option")
    const [open , setOpen] = React.useState(false);
  return(<View
    className={className}
    style={[props.style, style.dropdownBody]}
    {...props}
  >
    <DropdownContext.Provider value={{value , setValue , open , setOpen}}>

    {children}
    </DropdownContext.Provider>
  </View>
);
}
// dropdownTrigger

export const DropdownTrigger = ({
  className,
  children,
  ...props
}: DropdownTriggerProps) => (
  <Pressable
    className={className}
    {...props}
    style={[style.dropdownTrigger, props.style]}
  >
    {children}
  </Pressable>
);

// dropContent

export const DropdownContent = ({
  className,
  children,
  options,
   open,
  ...props 
}: DropdownContentProps) => (
  <View
    className={className}
    {...props}
    style={[style.dropdownContent, props.style]}
  >
    <FlatList
      data={options}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Pressable
          style={style.dropdownContentButton}
          onPress={() => {
            // onSelect(item);
            // setVisible(false);
          }}
        >
          <Text style={style.dropdownContentButtonText}>{item}</Text>
        </Pressable>
      )}
    />
  </View>
);

const style = StyleSheet.create({
  dropdownBody: {
   
  },

  dropdownTrigger: {
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  dropdownContent: {
   
  },
  dropdownContentButton: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "auto",
    paddingVertical: 12,
    marginVertical: 5,
  },
  dropdownContentButtonText: {
    textAlign: "center",
  },
});
