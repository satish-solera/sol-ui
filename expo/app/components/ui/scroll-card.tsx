


import * as React from 'react'
import { View, Text, FlatList, Image, StyleSheet, Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const data = [
    { img: require('../../../src/assets/image5.jpg') },

    { img: require('../../../src/assets/image2.jpg') },
    { img: require('../../../src/assets/image6.jpg') },

    { img: require('../../../src/assets/image8.jpg') }
]
export default () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    return (
        <View style={{ flex: 1 }}>

            <View
                style={
                    StyleSheet.absoluteFillObject
                }
            >
                {
                    data.map((ele, index) => {

                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width
                        ]
                        const opacity = scrollX.interpolate(
                            {
                                inputRange,
                                outputRange: [0, 1, 0]
                            }
                        )

                        
                        return <Animated.Image
                            key={`img-${index}`}
                            source={ele.img}
                            style={[
                                StyleSheet.absoluteFillObject,
                                {
                                    opacity
                                }
                            ]}
                        blurRadius={50}
                        />
                    })
                }
            </View>
            <Animated.FlatList

                onScroll={
                    Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )
            }
                data={data}
                keyExtractor={(...index) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({ item }) => {


                    return <View style={{ width, justifyContent: 'center', alignItems: 'center' ,
                        shadowColor: '#000',
                        shadowOpacity: 1 ,
                        shadowOffset:{
                            width: 0,
                            height: 0
                        },

                        shadowRadius: 20



                    }}>
                        <Image source={item.img} style={{
                            width: imageW,
                            height: imageH,
                            resizeMode: 'cover',
                            borderRadius: 16
                        }} />

                    </View>

                }}
            />
        </View>
    )
}