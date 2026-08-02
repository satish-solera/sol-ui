function Payment() {
  return (
    <div className="w-full  flex flex-col justify-center">
      <div className="w-full max-w-sm  flex flex-col items-center rounded-2xl ">
        <div className="w-full relative h-fit max-w-[20rem] bg-background text-foreground border rounded-2xl p-1">
          <div className="flex items-center justify-between  ">
            <input placeholder="Enter amount" className="outline-none ml-2" />
            <button className="select-none bg-background-inverse text-foreground-inverse rounded-2xl px-3 py-1 active:translate-y-px transition-all hover:bg-(--hover-primary) active:bg-(--hover-primary)">
              Pay
            </button>
          </div>
        </div>
      </div>
      <div
        data-slot="heading"
        className=" text-(--text-primary) text-sm ml-10 mt-1 "
      >
       Sending to <span className="text-foreground">Satish</span>
      </div>
    </div>
  );
}

export default Payment;
