"use client";
import * as React from "react";

function Payment() {
    const [change , setChange] = React.useState(true);
    const [isTransferMoney , setisTransferMoney] = React.useState(false);
    return (
        <div className="w-full flex items-center justify-center">
            <div className="max-w-122  w-full border  rounded-xl pt-5 pb-6 px-4">
                <div data-slot="title" className="text-md font-medium px-1 py-4">
                    Bank transfer
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2  overflow-hidden rounded-lg ">
                    <div className="">
                        <div data-role="sending-type" className="select-none text-sm text-(--text-primary) pl-1 py-px">{change ? "From" : "To"}</div>
                        <div data-role="bank-title" className="select-none text-sm  border rounded-lg px-2 py-1 flex items-center justify-between hover:bg-(--hover-secondary) group">
                            SOLA bank
                            <div className="rotate-180 group-active:translate-y-px transition-all">
                                <UpArrow />
                            </div>
                            
                        </div>
                        <div className="bg-(--hover-secondary)/90 rounded-lg mt-2">
                            <input
                                min={1}
                                type="number"
                                placeholder="Enter amount"
                                className="outline-none pl-2 py-1 border rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <button 
                    className="text-(--text-primary) text-sm hover:bg-[--hover-secondary] active:bg-[--hover-secondary] hover:text-foreground"
                    onClick={()=>setChange((prev)=> !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M20 10h-16l5.5 -6"></path><path d="M4 14h16l-5.5 6"></path></svg>
                    </button>

                    <div className="">
                        <div data-role="sending-type" className="select-none text-sm text-(--text-primary) pl-1 py-px">{change ?"To":"From"}</div>
                        <div data-role="bank-title" className="select-none text-sm  border rounded-lg px-2 py-1 flex items-center justify-between hover:bg-(--hover-secondary) group">
                            sb bank
                            <div className="rotate-180 group-active:translate-y-px transition-all">
                                <UpArrow />
                            </div>
                        </div>
                        <div className="bg-(--hover-secondary)/90 rounded-lg mt-2">
                            <input
                                min={1}
                                type="number"
                                placeholder="Enter amount"
                                className="outline-none pl-2 py-1 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-6 pr-4">
                     <div className="">
                        <button
                            aria-label="payment-request-btn"
                            data-slot="button"
                            data-variant="default"
                            data-size="default"
                            className="w-30 cursor-pointer bg-background-inverse text-foreground-inverse hover:bg-(--hover-primary) active:bg-(--hover-primary) text-center flex items-center bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3    gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 h-[31px] rounded-lg"
                            onClick={()=> {
                                setisTransferMoney(true);
                                setTimeout(()=>{
                                setisTransferMoney(false);
                                },3000)
                            }}
                        >
                            {
                            !isTransferMoney ? <p className="pb-[2.5px]">
                                Transfer money
                            </p> : <div className="flex flex-1 gap-1 items-center justify-center">
                                <div className="size-2 bg-background rounded-full animate-bounce transition-all ease-in"></div>
                                <div className="size-2 bg-background rounded-full animate-bounce transition-all ease-in delay-150"></div>
                                <div className="size-2 bg-background rounded-full animate-bounce transition-all ease-in"></div>
                            </div>
                            }
                        </button>
                    </div>
                </div>
                 <div data-role="payment-type" className="select-none text-[12px] text-(--text-primary) pr-2">Terms & conditions</div>
            </div>
        </div>
    );
}

export default Payment;


export const UpArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            color="currentColor"
            className=""
            strokeWidth="2"
            stroke="currentColor"
        >
            <path
                d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
        </svg>
    )
}