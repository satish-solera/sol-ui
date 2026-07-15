import { Beacon } from "../../../components/svgs/beacon";
import { Cisco } from "../../../components/svgs/cisco";

import { Vercel } from "../../../components/svgs/vercel";
import Header from "./header";


export function HeroOne() {
    const logoList = [
        {
            logo : <Cisco />
        },
        {
            logo : <Beacon />
        },
        {
            logo : <Vercel />,
            class : 'm-auto'
        },
    ]
    return (
        <div className="min-h-screen w-4xl ">
            <div className="w-3xl mx-auto pb-10">
                <Header/>

                <div className="pt-20">
                    <h1 className="text-4xl/[3rem] ">Payment <span className="italic text-blue-600">infrastrcutre </span> that handling</h1>
                    <p className="text-[#08090a99]">your business paymets, billing and many more securly.</p>
                    <div className="flex gap-3 py-3">

                        <button className="bg-blue-700 hover:bg-blue-700/90 text-white font-medium px-3 py-1 rounded-md cursor-pointer">
                            Try demo
                        </button>
                        <button className="border border-blue-100 font-medium px-3 py-1 rounded-md cursor-pointer hover:bg-blue-50">
                            Connect your payments
                        </button>
                    </div>

                </div>

                <div className="mt-14 flex gap-3 mx-auto w-full h-full justify-center  items-center border border-blue-100 p-2 rounded-md">
                    {
                                    logoList.map((el , id)=>{
                                    return(
                                        <div
                                        key={id}
                                        className={`w-70 h-40 bg-blue-50 hover:bg-blue-50/80 border border-blue-100 flex justify-center items-center rounded-[4px] ${el.class}`}>
                                                {el.logo}
                                        </div>
                                    )
                                    })
                    }
                 
                   
                </div>
            </div>
        </div>
    )
}

export default HeroOne;
