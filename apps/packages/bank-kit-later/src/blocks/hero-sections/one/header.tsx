
export default function Header (){
    return(
        <header>
            <nav className="flex justify-between items-center px-4 border border-blue-100 py-2 rounded-md" >
                    <p className="font-semibold font-serif select-none">sola</p>
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

                    <button className="bg-blue-700 hover:bg-blue-700/90 text-white font-medium px-3 py-1 rounded-md cursor-pointer">
                        Sign in
                    </button>
                </nav>
        </header>
    )
}