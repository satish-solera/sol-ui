import { useState } from "react";
import { Button } from "../components/ui/button";

export const ComponentDemoSection = () => {
    return (
        <section className="min-h-screen px-3 pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2  mx-auto gap-4 ">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />    
            </div>
        </section>
    );
};

export const Card = () => {
    const [showComponent, setShowComponent] = useState(false)
    return (
        
            <div className="h-60 md:w-96 border rounded-[4px] col-span-1 relative overflow-hidden group mx-auto ">
                <div className=" h-[198px] overflow-hidden p-3">
                    <img src="/image2.jpg" />
                </div>
                <div className="absolute bottom-0 w-full border-t flex justify-between ">
                    <Button className="border-0">
                        <p>Buttons</p>
                    </Button>
                    <Button className="border-0 text-center w-20  " onClick={() => setShowComponent(true)}>
                        <p className="mx-auto">More</p>
                    </Button>
                </div>
            </div>
        
    );
};


