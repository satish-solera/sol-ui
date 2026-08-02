const BankAcconts = [
  {
    name: "SOLA Bank",
    selected: true,
  },
  {
    name: "Sb inc",
    selected: false,
  },
];
function Payment() {
  return (
    <div className="w-full max-w-sm  flex items-center justify-center rounded-2xl">
      <div className="w-full relative h-80 max-w-[20rem] bg-(--hover-secondary) text-foreground border rounded-2xl px-3 pt-4">
        <div data-slot="card-title" className="text-md font-medium mb-1 pl-px">
          Sending money to
        </div>
        <div data-slot="heading" className=" text-(--text-primary) text-sm">
          Satish
        </div>
        <div className="flex flex-col items-center gap-2 mt-8">
          <input placeholder="Enter amount" className="outline-none" />
          <div className="flex items-center gap-2 select-none">
            <button className="active:translate-y-px transition-all hover:bg-(--hover-primary) active:bg-(--hover-primary) border w-fit px-3 py-1 rounded-2xl bg-background-inverse text-foreground-inverse">
              Pay
            </button>
            <button className="active:translate-y-px  transition-all hover:bg-(--hover-secondary) active:hover:bg-(--hover-secondary) border w-fit px-3 py-1 rounded-2xl">
              Cancle Payment
            </button>
          </div>
        </div>

        <div
          data-slot="card-title"
          className="text-md font-medium mb-1 pl-px mt-10"
        >
          Bank accounts
        </div>

        <div className="flex flex-col gap-2">
          {BankAcconts.map((el, id) => {
            return (
              <div
                key={id}
                data-slot="heading"
                className=" text-(--text-primary) text-sm flex justify-between items-center gap-2 border pb-1 pl-2 pr-1 rounded-2xl active:translate-y-px  transition-all hover:bg-(--hover-secondary) active:hover:bg-(--hover-secondary)"
              >
                <span className="pt-1 select-none">{el.name}</span>{" "}
                {el.selected && (
                  <span className="text-black  border border-green-200 rounded-full px-1 bg-green-100 dark:bg-green-200 select-none mt-1">
                    Selected
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Payment;
