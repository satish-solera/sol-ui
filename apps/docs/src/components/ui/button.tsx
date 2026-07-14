import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  typeOfBtn?: string;
 
};

export const Button = ({
  className,
  children,
  
  typeOfBtn = "white",
  ...props
}: ButtonProps) => {
  return(
    <button
   
    className={cn(
      "text-[14px] font-medium  py-2 px-4 rounded-xs flex items-center cursor-pointer active:scale-[101%] ",
      className,
      typeOfBtn == "black" ? "bg-black text-white  dark:border hover:bg-black/90  dark:hover:bg-[#08090a] " : " hover:bg-black/2 dark:hover:bg-white/90 dark:bg-white dark:text-black border"
    )}
    {...props}
  >
    {children}
  </button>
  )
};
