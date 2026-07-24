"use client";
import * as React from "react";
import { HeroOne } from "@sol-ui/bank-kit/blocks";
import { HeroTwo } from "@sol-ui/bank-kit/blocks";
import { IconArrowLeft, IconDeviceMobile, IconGift, IconTicket} from "@tabler/icons-react";

const RightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-check mt-0.5 size-4 shrink-0 text-muted-foreground"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
);
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.5 1.8v8.4c0 .5.6.8 1 .5l6.5-4.2c.4-.3.4-.9 0-1.2L3.5 1.3c-.4-.3-1 .1-1 .5Z" />
    </svg>
  );
}

export default function BankKitPage() {
  return (
    <section>
      <div className="min-h-[90%vh] pt-20 px-10 flex justify-center pb-14">
        <div>
          <h1 className="font-semibold font-serif text-4xl/[2.5rem] tracking-normal">
            Build better banking experiences
          </h1>
          <p className="text-lg/6 text-[#08090a99] dark:text-white/90 py-3 text-center">
            with our <span className="text-black dark:text-white">banking</span>{" "}
            and <span className="text-black dark:text-white">finicial</span>{" "}
            production
            <br />
            level UI and blocks
          </p>
          <div className="flex w-full items-center justify-center gap-2 mt-1 ">
            <a
              data-slot="button"
              data-variant="default"
              data-size="default"
              className="bg-black text-white dark:bg-white/90 dark:text-black flex items-center justify-center  bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3  [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4  gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 h-[31px] rounded-lg"
              href=""
            >
              <p className="pb-[2.5px]">Explore more</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-arrow-right "
                data-icon="inline-end"
              >
                <path d="M5 12l14 0"></path>
                <path d="M13 18l6 -6"></path>
                <path d="M13 6l6 6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 mx-5 gap-3 ">
        <div className="flex flex-col gap-3 mx-5 items-center">
          <div className="flex justify-center overflow-hidden text-sm w-sm  border border-neutral-200 rounded-[min(var(--radius-2xl),24px)]">
            <MoneyScanner />
          </div>
          <div className="flex justify-center py-2 overflow-hidden text-sm w-[24rem] border border-neutral-200 rounded-[min(var(--radius-2xl),24px)]">
            <AddBankAccount />
          </div>
        </div>
        <div className="flex flex-col gap-3 mx-5 items-center">
          <div className="flex justify-center items-center overflow-hidden text-sm w-sm  border border-neutral-200 rounded-[min(var(--radius-2xl),24px)] px-1 py-4">
            <History />
          </div>
          <div className="p-5 flex justify-center  overflow-hidden text-sm w-sm  border border-neutral-200 rounded-[min(var(--radius-2xl),24px)]">
            <Services />
          </div>
        </div>
        <div className="flex flex-col gap-3 mx-5 items-center">
          <div className=" flex justify-center items-center overflow-hidden text-sm w-sm  border border-neutral-200 rounded-[min(var(--radius-2xl),24px)] px-5 pt-4 pb-10">
            <Chart/>
          </div>
          <div className=" flex justify-center items-center overflow-hidden text-sm w-sm  border border-neutral-200 rounded-[min(var(--radius-2xl),24px)] p-5">
            side bar
          </div>
          
        </div>
      </div>

      <div className="rounded-[min(var(--radius-2xl),24px)] border mx-10 ring ring-neutral-50 pt-5 my-10 relative">
        <div className="mx-[10%]">
          <HeroTwo />
        </div>
      </div>
      <div className="rounded-[min(var(--radius-2xl),24px)] border mx-10 mb-20 ring ring-neutral-50 pt-5">
        <div className="mx-[10%]">
          <HeroOne />
        </div>
      </div>
    </section>
  );
}

export const AddBankAccount = () => {
  return (
    <div className="w-80 h-fit my-5 mx-2 relative ">
      <div className="flex items-center justify-between mb-6">
        <div
          data-role="back-arrow"
          className="size-8 bg-black/5 rounded-full flex items-center justify-center active:not-aria-[haspopup]:translate-y-px "
        >
          <IconArrowLeft size={18} />
        </div>
        <div data-slot="card-title" className="font-medium">
          Bank Accounts
        </div>
      </div>

      <div className="cursor-pointer border hover:bg-black/5 rounded-md flex items-center justify-between relative py-2 my-2">
        <div className="pl-2 inline-flex items-center gap-2">
          <span className="w-[60px] truncate">sola bank bf</span>
          <span>***71</span>
        </div>
        <div className="flex items-center gap-2 pr-1">
          <span
            data-slot="badge"
            data-variant="outline"
            className="group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-2xl border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 "
          >
            Primary
          </span>
          <div className="rotate-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              className=""
              stroke-width="2"
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
          </div>
        </div>
      </div>
      <div className="cursor-pointer border hover:bg-black/5 rounded-md flex items-center justify-between relative py-2 ">
        <div className="pl-2 inline-flex items-center gap-2 ">
          <span className="w-[60px] overflow-hidden">smp</span>
          <span>***89</span>
        </div>
        <div className="flex items-center gap-2 pr-1">
          <div className="rotate-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              className=""
              stroke-width="2"
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
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-1 text-center mt-4 ">
        <button
          role="add-new-bank-account"
          data-slot="button"
          data-variant="default"
          data-size="default"
          className="cursor-pointer bg-black text-white dark:bg-white/90 dark:text-black flex items-center justify-center bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3  [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4  gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 h-[31px] rounded-lg"
        >
          <p className="pb-[2.5px]">Add new bank account</p>
        </button>
      </div>
    </div>
  );
};

export const MoneyScanner = () => {
  return (
    <div className="">
      <div data-slot="card-content" className="flex justify-center py-6">
        <div className="rounded-xl border bg-white p-4">
          <svg
            viewBox="0 0 21 21"
            className="size-40 text-black"
            role="img"
            aria-label="Connect device QR code"
            shape-rendering="crispEdges"
          >
            <rect width="21" height="21" fill="white"></rect>
            <rect x="0" y="0" width="1" height="1"></rect>
            <rect x="1" y="0" width="1" height="1"></rect>
            <rect x="2" y="0" width="1" height="1"></rect>
            <rect x="3" y="0" width="1" height="1"></rect>
            <rect x="4" y="0" width="1" height="1"></rect>
            <rect x="5" y="0" width="1" height="1"></rect>
            <rect x="6" y="0" width="1" height="1"></rect>
            <rect x="9" y="0" width="1" height="1"></rect>
            <rect x="11" y="0" width="1" height="1"></rect>
            <rect x="12" y="0" width="1" height="1"></rect>
            <rect x="14" y="0" width="1" height="1"></rect>
            <rect x="15" y="0" width="1" height="1"></rect>
            <rect x="16" y="0" width="1" height="1"></rect>
            <rect x="17" y="0" width="1" height="1"></rect>
            <rect x="18" y="0" width="1" height="1"></rect>
            <rect x="19" y="0" width="1" height="1"></rect>
            <rect x="20" y="0" width="1" height="1"></rect>
            <rect x="0" y="1" width="1" height="1"></rect>
            <rect x="6" y="1" width="1" height="1"></rect>
            <rect x="8" y="1" width="1" height="1"></rect>
            <rect x="11" y="1" width="1" height="1"></rect>
            <rect x="14" y="1" width="1" height="1"></rect>
            <rect x="20" y="1" width="1" height="1"></rect>
            <rect x="0" y="2" width="1" height="1"></rect>
            <rect x="2" y="2" width="1" height="1"></rect>
            <rect x="3" y="2" width="1" height="1"></rect>
            <rect x="4" y="2" width="1" height="1"></rect>
            <rect x="6" y="2" width="1" height="1"></rect>
            <rect x="8" y="2" width="1" height="1"></rect>
            <rect x="9" y="2" width="1" height="1"></rect>
            <rect x="10" y="2" width="1" height="1"></rect>
            <rect x="11" y="2" width="1" height="1"></rect>
            <rect x="12" y="2" width="1" height="1"></rect>
            <rect x="14" y="2" width="1" height="1"></rect>
            <rect x="16" y="2" width="1" height="1"></rect>
            <rect x="17" y="2" width="1" height="1"></rect>
            <rect x="18" y="2" width="1" height="1"></rect>
            <rect x="20" y="2" width="1" height="1"></rect>
            <rect x="0" y="3" width="1" height="1"></rect>
            <rect x="2" y="3" width="1" height="1"></rect>
            <rect x="3" y="3" width="1" height="1"></rect>
            <rect x="4" y="3" width="1" height="1"></rect>
            <rect x="6" y="3" width="1" height="1"></rect>
            <rect x="9" y="3" width="1" height="1"></rect>
            <rect x="14" y="3" width="1" height="1"></rect>
            <rect x="16" y="3" width="1" height="1"></rect>
            <rect x="17" y="3" width="1" height="1"></rect>
            <rect x="18" y="3" width="1" height="1"></rect>
            <rect x="20" y="3" width="1" height="1"></rect>
            <rect x="0" y="4" width="1" height="1"></rect>
            <rect x="2" y="4" width="1" height="1"></rect>
            <rect x="3" y="4" width="1" height="1"></rect>
            <rect x="4" y="4" width="1" height="1"></rect>
            <rect x="6" y="4" width="1" height="1"></rect>
            <rect x="8" y="4" width="1" height="1"></rect>
            <rect x="10" y="4" width="1" height="1"></rect>
            <rect x="12" y="4" width="1" height="1"></rect>
            <rect x="14" y="4" width="1" height="1"></rect>
            <rect x="16" y="4" width="1" height="1"></rect>
            <rect x="17" y="4" width="1" height="1"></rect>
            <rect x="18" y="4" width="1" height="1"></rect>
            <rect x="20" y="4" width="1" height="1"></rect>
            <rect x="0" y="5" width="1" height="1"></rect>
            <rect x="6" y="5" width="1" height="1"></rect>
            <rect x="9" y="5" width="1" height="1"></rect>
            <rect x="10" y="5" width="1" height="1"></rect>
            <rect x="11" y="5" width="1" height="1"></rect>
            <rect x="14" y="5" width="1" height="1"></rect>
            <rect x="20" y="5" width="1" height="1"></rect>
            <rect x="0" y="6" width="1" height="1"></rect>
            <rect x="1" y="6" width="1" height="1"></rect>
            <rect x="2" y="6" width="1" height="1"></rect>
            <rect x="3" y="6" width="1" height="1"></rect>
            <rect x="4" y="6" width="1" height="1"></rect>
            <rect x="5" y="6" width="1" height="1"></rect>
            <rect x="6" y="6" width="1" height="1"></rect>
            <rect x="8" y="6" width="1" height="1"></rect>
            <rect x="10" y="6" width="1" height="1"></rect>
            <rect x="12" y="6" width="1" height="1"></rect>
            <rect x="14" y="6" width="1" height="1"></rect>
            <rect x="15" y="6" width="1" height="1"></rect>
            <rect x="16" y="6" width="1" height="1"></rect>
            <rect x="17" y="6" width="1" height="1"></rect>
            <rect x="18" y="6" width="1" height="1"></rect>
            <rect x="19" y="6" width="1" height="1"></rect>
            <rect x="20" y="6" width="1" height="1"></rect>
            <rect x="8" y="7" width="1" height="1"></rect>
            <rect x="9" y="7" width="1" height="1"></rect>
            <rect x="11" y="7" width="1" height="1"></rect>
            <rect x="0" y="8" width="1" height="1"></rect>
            <rect x="2" y="8" width="1" height="1"></rect>
            <rect x="4" y="8" width="1" height="1"></rect>
            <rect x="5" y="8" width="1" height="1"></rect>
            <rect x="6" y="8" width="1" height="1"></rect>
            <rect x="7" y="8" width="1" height="1"></rect>
            <rect x="8" y="8" width="1" height="1"></rect>
            <rect x="11" y="8" width="1" height="1"></rect>
            <rect x="12" y="8" width="1" height="1"></rect>
            <rect x="13" y="8" width="1" height="1"></rect>
            <rect x="14" y="8" width="1" height="1"></rect>
            <rect x="16" y="8" width="1" height="1"></rect>
            <rect x="18" y="8" width="1" height="1"></rect>
            <rect x="19" y="8" width="1" height="1"></rect>
            <rect x="1" y="9" width="1" height="1"></rect>
            <rect x="3" y="9" width="1" height="1"></rect>
            <rect x="8" y="9" width="1" height="1"></rect>
            <rect x="9" y="9" width="1" height="1"></rect>
            <rect x="10" y="9" width="1" height="1"></rect>
            <rect x="13" y="9" width="1" height="1"></rect>
            <rect x="15" y="9" width="1" height="1"></rect>
            <rect x="17" y="9" width="1" height="1"></rect>
            <rect x="20" y="9" width="1" height="1"></rect>
            <rect x="0" y="10" width="1" height="1"></rect>
            <rect x="1" y="10" width="1" height="1"></rect>
            <rect x="2" y="10" width="1" height="1"></rect>
            <rect x="4" y="10" width="1" height="1"></rect>
            <rect x="6" y="10" width="1" height="1"></rect>
            <rect x="7" y="10" width="1" height="1"></rect>
            <rect x="8" y="10" width="1" height="1"></rect>
            <rect x="10" y="10" width="1" height="1"></rect>
            <rect x="11" y="10" width="1" height="1"></rect>
            <rect x="12" y="10" width="1" height="1"></rect>
            <rect x="14" y="10" width="1" height="1"></rect>
            <rect x="15" y="10" width="1" height="1"></rect>
            <rect x="16" y="10" width="1" height="1"></rect>
            <rect x="17" y="10" width="1" height="1"></rect>
            <rect x="19" y="10" width="1" height="1"></rect>
            <rect x="2" y="11" width="1" height="1"></rect>
            <rect x="3" y="11" width="1" height="1"></rect>
            <rect x="5" y="11" width="1" height="1"></rect>
            <rect x="9" y="11" width="1" height="1"></rect>
            <rect x="11" y="11" width="1" height="1"></rect>
            <rect x="16" y="11" width="1" height="1"></rect>
            <rect x="18" y="11" width="1" height="1"></rect>
            <rect x="20" y="11" width="1" height="1"></rect>
            <rect x="0" y="12" width="1" height="1"></rect>
            <rect x="1" y="12" width="1" height="1"></rect>
            <rect x="3" y="12" width="1" height="1"></rect>
            <rect x="4" y="12" width="1" height="1"></rect>
            <rect x="5" y="12" width="1" height="1"></rect>
            <rect x="6" y="12" width="1" height="1"></rect>
            <rect x="8" y="12" width="1" height="1"></rect>
            <rect x="9" y="12" width="1" height="1"></rect>
            <rect x="10" y="12" width="1" height="1"></rect>
            <rect x="11" y="12" width="1" height="1"></rect>
            <rect x="13" y="12" width="1" height="1"></rect>
            <rect x="15" y="12" width="1" height="1"></rect>
            <rect x="16" y="12" width="1" height="1"></rect>
            <rect x="17" y="12" width="1" height="1"></rect>
            <rect x="19" y="12" width="1" height="1"></rect>
            <rect x="20" y="12" width="1" height="1"></rect>
            <rect x="8" y="13" width="1" height="1"></rect>
            <rect x="11" y="13" width="1" height="1"></rect>
            <rect x="13" y="13" width="1" height="1"></rect>
            <rect x="17" y="13" width="1" height="1"></rect>
            <rect x="19" y="13" width="1" height="1"></rect>
            <rect x="0" y="14" width="1" height="1"></rect>
            <rect x="1" y="14" width="1" height="1"></rect>
            <rect x="2" y="14" width="1" height="1"></rect>
            <rect x="3" y="14" width="1" height="1"></rect>
            <rect x="4" y="14" width="1" height="1"></rect>
            <rect x="5" y="14" width="1" height="1"></rect>
            <rect x="6" y="14" width="1" height="1"></rect>
            <rect x="8" y="14" width="1" height="1"></rect>
            <rect x="9" y="14" width="1" height="1"></rect>
            <rect x="11" y="14" width="1" height="1"></rect>
            <rect x="12" y="14" width="1" height="1"></rect>
            <rect x="13" y="14" width="1" height="1"></rect>
            <rect x="14" y="14" width="1" height="1"></rect>
            <rect x="15" y="14" width="1" height="1"></rect>
            <rect x="17" y="14" width="1" height="1"></rect>
            <rect x="20" y="14" width="1" height="1"></rect>
            <rect x="0" y="15" width="1" height="1"></rect>
            <rect x="6" y="15" width="1" height="1"></rect>
            <rect x="10" y="15" width="1" height="1"></rect>
            <rect x="14" y="15" width="1" height="1"></rect>
            <rect x="17" y="15" width="1" height="1"></rect>
            <rect x="18" y="15" width="1" height="1"></rect>
            <rect x="19" y="15" width="1" height="1"></rect>
            <rect x="20" y="15" width="1" height="1"></rect>
            <rect x="0" y="16" width="1" height="1"></rect>
            <rect x="2" y="16" width="1" height="1"></rect>
            <rect x="3" y="16" width="1" height="1"></rect>
            <rect x="4" y="16" width="1" height="1"></rect>
            <rect x="6" y="16" width="1" height="1"></rect>
            <rect x="8" y="16" width="1" height="1"></rect>
            <rect x="10" y="16" width="1" height="1"></rect>
            <rect x="11" y="16" width="1" height="1"></rect>
            <rect x="12" y="16" width="1" height="1"></rect>
            <rect x="14" y="16" width="1" height="1"></rect>
            <rect x="15" y="16" width="1" height="1"></rect>
            <rect x="16" y="16" width="1" height="1"></rect>
            <rect x="18" y="16" width="1" height="1"></rect>
            <rect x="0" y="17" width="1" height="1"></rect>
            <rect x="2" y="17" width="1" height="1"></rect>
            <rect x="3" y="17" width="1" height="1"></rect>
            <rect x="4" y="17" width="1" height="1"></rect>
            <rect x="6" y="17" width="1" height="1"></rect>
            <rect x="9" y="17" width="1" height="1"></rect>
            <rect x="10" y="17" width="1" height="1"></rect>
            <rect x="12" y="17" width="1" height="1"></rect>
            <rect x="16" y="17" width="1" height="1"></rect>
            <rect x="19" y="17" width="1" height="1"></rect>
            <rect x="20" y="17" width="1" height="1"></rect>
            <rect x="0" y="18" width="1" height="1"></rect>
            <rect x="2" y="18" width="1" height="1"></rect>
            <rect x="3" y="18" width="1" height="1"></rect>
            <rect x="4" y="18" width="1" height="1"></rect>
            <rect x="6" y="18" width="1" height="1"></rect>
            <rect x="8" y="18" width="1" height="1"></rect>
            <rect x="12" y="18" width="1" height="1"></rect>
            <rect x="13" y="18" width="1" height="1"></rect>
            <rect x="14" y="18" width="1" height="1"></rect>
            <rect x="15" y="18" width="1" height="1"></rect>
            <rect x="17" y="18" width="1" height="1"></rect>
            <rect x="18" y="18" width="1" height="1"></rect>
            <rect x="19" y="18" width="1" height="1"></rect>
            <rect x="0" y="19" width="1" height="1"></rect>
            <rect x="6" y="19" width="1" height="1"></rect>
            <rect x="8" y="19" width="1" height="1"></rect>
            <rect x="9" y="19" width="1" height="1"></rect>
            <rect x="11" y="19" width="1" height="1"></rect>
            <rect x="16" y="19" width="1" height="1"></rect>
            <rect x="17" y="19" width="1" height="1"></rect>
            <rect x="20" y="19" width="1" height="1"></rect>
            <rect x="0" y="20" width="1" height="1"></rect>
            <rect x="1" y="20" width="1" height="1"></rect>
            <rect x="2" y="20" width="1" height="1"></rect>
            <rect x="3" y="20" width="1" height="1"></rect>
            <rect x="4" y="20" width="1" height="1"></rect>
            <rect x="5" y="20" width="1" height="1"></rect>
            <rect x="6" y="20" width="1" height="1"></rect>
            <rect x="8" y="20" width="1" height="1"></rect>
            <rect x="10" y="20" width="1" height="1"></rect>
            <rect x="11" y="20" width="1" height="1"></rect>
            <rect x="12" y="20" width="1" height="1"></rect>
            <rect x="14" y="20" width="1" height="1"></rect>
            <rect x="15" y="20" width="1" height="1"></rect>
            <rect x="17" y="20" width="1" height="1"></rect>
            <rect x="18" y="20" width="1" height="1"></rect>
            <rect x="19" y="20" width="1" height="1"></rect>
            <rect x="20" y="20" width="1" height="1"></rect>
          </svg>
        </div>
      </div>
      <div
        data-slot="card-header"
        className="group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-[min(var(--radius-4xl),24px)] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing) text-center"
      >
        <div
          data-slot="card-title"
          className="cn-font-heading text-base font-medium"
        >
          Scan to pay digitally
        </div>
        <div
          data-slot="card-description"
          className="text-sm  text-balance px-5 pb-5"
        >
          scan this code to send money.
        </div>
      </div>
    </div>
  );
};


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
    <div className="w-80 h-fit">
        <div data-slot="card-title" className="text-md font-medium mb-1 pl-2">
          History
        </div>

        <div data-slot="heading" className=" pl-2 text-neutral-600 text-sm">March</div>
       
        <div className="pl-2">
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
    <div className="flex justify-between items-center bg-black/3 hover:bg-black/5 my-1 p-2 rounded-lg select-none ">
      <div className="">
        {
        status == "Paid to" ? <div data-role="payment-type" className="text-[12px] text-neutral-600">Paid to</div> : <div data-role="payment-type" className="text-[12px] text-neutral-600">Received from</div>
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


export const Chart = () =>{
  return(
    <div className="relative w-full h-fit py-10 ">
      <div className="bg-grid-green w-full h-20 absolute inset-0  rounded-lg border-r border-neutral-200"/>
      <p className="absolute -bottom-6 left-1 text-neutral-600 ">45% Balance</p>
      <div className="w-40 h-20 absolute bg-green-300 inset-0 rounded-l-lg"/>
      <p className="absolute -bottom-6 right-1  text-neutral-600">65% Spent</p>
    </div>
  )
}

export const Services = () =>{
  return(
    <div className="">
       <div data-slot="card-title" className="text-md font-medium pb-2 pl-2">
          Services
        </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col justify-center items-center group">
          <div className="group-hover:translate-y-px bg-black/3 hover:bg-black/5 size-20  flex items-center justify-center rounded-lg ">
          <IconDeviceMobile/>
          </div>
            <div data-slot="heading" className=" pl-2 text-neutral-600 text-sm">Recharges</div>
        </div>
        
        <div className="flex flex-col justify-center items-center">

        <div className=" bg-black/3 hover:bg-black/5 size-20 flex items-center justify-center rounded-lg">
          <IconGift/>
        </div>
            <div data-slot="heading" className=" pl-2 text-neutral-600 text-sm">March</div>
        </div>
        <div className="flex flex-col justify-center items-center">

        <div className= "bg-black/3 hover:bg-black/5 size-20 flex items-center justify-center rounded-lg">
          <IconTicket/>
        </div>
            <div data-slot="heading" className=" pl-2 text-neutral-600 text-sm">March</div>
        </div>
      </div>
    </div>
  )
}