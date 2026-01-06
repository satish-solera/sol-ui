import { cn } from '@/lib/utils/cn'
import { motion } from 'motion/react'
import React, { useState } from 'react'

function AnimationThemeComponent() {


    const [themeComponent, setThemeComponent] = useState('white')
    const [activeId, setActiveId] = useState(2)
    return (
        <>
            {/* animation with theme */}
            <div className='min-h-screen flex  flex-col md:flex-row justify-between gap-4 '>


                <div className="">
                    {/* show compoents here in bento grid */}
                    <div className="grid grid-cols-2 w-xl  gap-2">

                        <div className="h-40">
                            <img src='/screen2.jpg'draggable={false}  className='object-cover h-full w-full' />
                        </div>
                        <div className="h-60">
                            <img src='/screen-3.jpg' draggable={false} className='object-cover h-full w-full' />
                        </div>
                        <div className="h-60 -translate-y-20">
                            <img src='/screen-4.jpg' draggable={false} className='object-cover h-full w-full' />
                        </div>
                        <div className="h-40">
                            <img src='/screen2.jpg' draggable={false} className='object-cover h-full w-full' />
                        </div>
                        <div className="h-40  -translate-y-20">
                            <img src='/screen2.jpg' draggable={false} className='object-cover h-full w-full' />
                        </div>
                        <div className="h-40 -translate-y-20">
                            <img src='/screen-5.jpg' draggable={false} className='object-cover h-full w-full' />
                        </div>
                       


                    </div>
                </div>
                <div className="mx-auto">
                    <div className="">


                        <h1 className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                            Match Components with your <br />
                            Color Theme
                        </h1>

                        {/* if someone use the dark theme then show dark components and if light then show light theme componets */}
                        <div className="flex space-x-5 my-5 relative">
                            <button className=' relative py-2 border bg-black  border-neutral-300 text-white px-5 rounded-lg cursor-pointer' onClick={() => {
                                setThemeComponent('dark')
                                setActiveId(1)
                            }}>
                                Dark <span className={cn('size-2 bg-green-700 rounded-full absolute top-1 left-16 hidden animate-pulse', activeId == 1 && 'block')}></span>
                            </button>
                            <button className='relative py-2 border bg-black/10 dark:bg-white border-neutral-300 text-black/60 px-5 rounded-lg' onClick={() => {
                                setThemeComponent('white')
                                setActiveId(2)
                            }}>
                                White <div className={cn('size-2 bg-green-700 rounded-full absolute top-1 left-17 hidden animate-pulse', activeId == 2 && 'block')}></div>
                            </button>
                        </div>

                        {/* color theme components demo */}

                        {/* <div className="grid grid-cols-2 gap-4 mt-10 border border-neutral-300 max-w-2xl ">
                                <Button className={cn("hover:bg-none w-full", themeComponent == 'dark' ? 'bg-black' : 'bg-white text-black')}>
                                    dark
                                </Button>
                                <Card>
                                    <CardHeader>
                                        hi
                                    </CardHeader>
                                    <CardDescription>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptas labore ad? Officiis, incidunt quod itaque distinctio illo ducimus repellat ad recusandae veniam perspiciatis officia inventore molestias architecto minima maxime!
                                    </CardDescription>
                                </Card>
    
                                <Card>
                                    <CardHeader>
                                        hi
                                    </CardHeader>
                                    <CardDescription>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptas labore ad? Officiis, incidunt quod itaque distinctio illo ducimus repellat ad recusandae veniam perspiciatis officia inventore molestias architecto minima maxime!
                                    </CardDescription>
                                </Card>
    
                                <Button className={cn("hover:bg-none w-full", themeComponent == 'dark' ? 'bg-black' : 'bg-white text-black')}>
                                    dark
                                </Button>
                                <Card>
                                    <CardHeader>
                                        hi
                                    </CardHeader>
                                    <CardDescription>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptas labore ad? Officiis, incidunt quod itaque distinctio illo ducimus repellat ad recusandae veniam perspiciatis officia inventore molestias architecto minima maxime!
                                    </CardDescription>
                                </Card>
                            </div> */}
                    </div>
                </div>
            </div>

            {/* end animation with theme */}
        </>

    )
}

export default AnimationThemeComponent