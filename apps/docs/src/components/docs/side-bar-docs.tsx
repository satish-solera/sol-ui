"use client";
import * as React from "react";
import {
  IconHelp,
  IconHome,
  IconLayoutSidebarFilled,
  IconNotification,
  IconSettings,
  IconTransfer,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils/cn";
import { registry } from "@sol-ui/bank-kit";
import Link from "next/link";

export const SideBarDocs = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = React.useState<boolean>(true);
  return (
    <div className="w-full min-h-screen max-w-sm flex gap-4 overflow-hidden">
      <div
        className={cn(
          sideBarIsOpen
            ? "min-h-screen w-58 h-full relative border rounded-lg pb-5 transition-all "
            : "min-h-screen w-10 h-full relative border rounded-lg transition-all pb-5 ",
        )}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSideBarIsOpen((prev) => !prev);
            
          }}
          className={cn(
            sideBarIsOpen
              ? "absolute right-3 top-2   z-10"
              : "absolute top-2 right-2.5 z-10",
          )}
        >
          <IconLayoutSidebarFilled size={16} />
        </div>

         
        {sideBarIsOpen && (
          <div className="pt-8 px-1 relative">
            {registry.map((el, id) => {
              return (
                <Link key={el.slug + id} href={`/bank-kit/components/${el.slug}`}>
                  <div
                    key={id}
                    data-slot="heading"
                    className="pl-2 py-2 text-neutral-600 text-sm flex items-center gap-2 hover:bg-black/5 active:bg-black/5 hover:text-black active:translate-y-px select-none transition-all whitespace-nowrap rounded-lg"
                  >
                    {el.title}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
