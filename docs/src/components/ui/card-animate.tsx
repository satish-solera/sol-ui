
import { motion } from 'motion/react'
import React from 'react'

function CardAnimate() {
    return (
        <div className='min-h-svh'>

            <div className="cards relative flex shrink mx-auto items-center justify-center">
                <div className="card  bg-neutral-200 rounded-2xl absolute -translate-x-[100%]  translate-y-[25%] ">
                    <img src='/image11.jpg' alt='img'/>
                </div>
                <div className="card  bg-red-200 rounded-2xl absolute -translate-x-[80%] translate-y-[20%]">
                    <img src='/image3.jpg' alt='img'/>
                </div>

                <div className="card  bg-yellow-200 rounded-2xl absolute -translate-x-[50%] translate-y-[10%]">
                    <img src='/image4.jpg' alt='img'/>
                </div>
                <div  className="card  bg-green-800 rounded-2xl absolute z-100 text-center ">
                    <img src='/image5.jpg' alt='img'/>
                </div>
                <div className="card  bg-red-300 rounded-2xl absolute  translate-x-[50%] z-80 translate-y-[10%]">
                    <img src='/image6.jpg' alt='img'/>
                </div>

                <div className="card  bg-blue-200 rounded-2xl absolute translate-x-[80%] z-70 translate-y-[20%]">
                    <img src='/image12.jpg' alt='img'/>
                </div>
                <div className="card  bg-yellow-200 rounded-2xl absolute  translate-x-[100%] translate-y-[25%]">
                    <img src='/image8.jpg' alt='img'/>
                </div>

            </div>
        </div>
    )
}

export default CardAnimate