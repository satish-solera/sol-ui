
export default function Header(){
    return(
        <header>
            <nav className="flex justify-between items-center border border-blue-100 rounded-md p-[2px]" >
                    <p className="font-semibold font-serif select-none pl-2">sola</p>
                    <ul className="flex gap-3 items-center">
                    {
                        ["Home" , "Pricing" , "About"].map((el , id)=>{
                            return(
                                <li
                                aria-label={el}
                                role="navlink"
                                key={id}
                                className="hover:text-[#08090a99] cursor-pointer"
                                >
                                    {
                                        el
                                    }
                                </li>
                            )
                        })
                    } 
                    </ul>

                    <button className="bg-blue-700 hover:bg-blue-700/90 text-white px-3 py-1 rounded-[4px] cursor-pointer">
                        Sign in
                    </button>
                </nav>
        </header>
    )
}