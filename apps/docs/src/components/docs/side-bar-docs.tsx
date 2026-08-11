"use client";
import * as React from "react";
import {
  IconLayoutSidebarFilled,

} from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { registry } from "@sol-ui/bank-kit";
import Link from "next/link";


type RegistryItem = {
  title: string,
  category: string,
  slug: string
}

export const SideBarDocs = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = React.useState<boolean>(true);

  const grouped: Record<string, RegistryItem[]> = {};

  registry.filter((x) => x.type == "component").forEach((item) => {
    // creating category if dont present in grouped
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  })

  return (
    <div className="sticky top-[calc(7rem+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overflow-hidden overscroll-none lg:flex">
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-10 bg-linear-to-b from-background to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 right-0 left-0 h-10 bg-linear-to-t from-background to-transparent z-10" />
      <div
        className={cn(
          "w-80  relative border-x py-5 transition-all scroll-smooth overflow-y-scroll scrollbar-none "
        )}>

        <div
          data-slot="heading"
          className="pl-8 py-2 text-(--text-primary) hover:text-foreground text-sm flex items-center gap-2 active:translate-y-px select-none transition-all whitespace-nowrap rounded-lg"
        >
          <Link href={`/bank-kit/docs`}>
            Introduction
          </Link>
        </div>

        {sideBarIsOpen && (
          <div className=" overflow-hidden">
            {Object.entries(grouped).map(([category, item]) => {
              return (
                <div key={category} className="">
                  <div data-slot="card-title" className="text-md font-medium my-1 pb-2 pl-6 ">
                    {category}
                  </div>
                  {
                    item.map((el, id) => {
                      return (
                        <div
                          key={id}
                          data-slot="heading"
                          className="pl-8 py-2 text-(--text-primary) hover:text-foreground text-sm flex items-center gap-2 active:translate-y-px select-none transition-all whitespace-nowrap rounded-lg"
                        >
                          <Link key={id} href={`/bank-kit/docs/${el.slug}`}>
                            {el.title}
                          </Link>
                        </div>
                      )
                    })
                  }
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
