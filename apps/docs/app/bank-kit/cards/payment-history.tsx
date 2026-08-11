
const dummyTransections = [
    {
        status: "Paid to",
        name:"Solera",
        amount:45
    },
    {
        status: "Received from",
        name:"John",
        amount:230
    },
    {
        status: "Paid to",
        name:"Ron",
        amount:4
    },
  
];

export const History = () =>{
  return(
    <div className="max-w-sm h-fit">
        <div data-slot="card-title" className="text-md font-medium mb-1 pl-px">
          History
        </div>
        <div data-slot="heading" className=" text-(--text-primary) text-sm">March</div>
        <div className="">
          {
            dummyTransections.map((el , id)=>{
              return(
                <HistoryList 
                key={id}
                name={el.name}
                amount={el.amount}
                status={el.status}
                />
              )
            })
          }
        </div>
    </div>
  )
}

export const HistoryList = ({name,
  amount,
  status,} : {name: string , amount: number , status: string}) =>{
  return(
    <div className="flex justify-between items-center bg-(--hover-secondary)/40  hover:bg-(--hover-secondary) my-1 py-2 px-3 rounded-lg select-none border ">
      <div className="">
        {
        status == "Paid to" ? <div data-role="payment-type" className="text-[12px] text-(--text-primary)">Paid to</div> : <div data-role="payment-type" className="text-[12px] text-(--text-primary)">Received from</div>
        }
       <p className="text-md font-medium">{name}</p>
      </div>

          {status == "Paid to" ? (
            <p className="text-md font-semibold">
              - <span>{amount}</span>
            </p>
          ) : (
            <p className="text-green-700  text-md font-semibold">
              + <span>{amount}</span>
            </p>
          )}
    </div>
  )
}

