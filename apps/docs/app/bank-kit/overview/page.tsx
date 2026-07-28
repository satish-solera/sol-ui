import { TabPanel } from "@/app/view/tooltips/tab-panal";
import BlockPreview from "@/src/components/docs/docs-blocks-renderer/block-preview";
import IframeRenderer from "@/src/components/docs/docs-blocks-renderer/iframe-block-renderer";
import {
  ResizableHandler,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/docs/resizable";
import HeroOne, { registry } from "@sol-ui/bank-kit";

import Link from "next/link";
function Overview() {
  return (
    <div className="flex flex-col gap-10 ">
      {registry.map((el, id) => {
        return (
          <div className="mx-10" key={id}>
            <div className="w-full my-8 ">
              <TabPanel code={el.title} command={el.slug} />
            </div>
            <div className="relative w-full grid rounded-[min(var(--radius-2xl),24px)] border p-5">
              <div className="absolut inset-0">
                <BlockPreview 
                idx={el.title + "block"}
                src={el.slug}
                />
              </div>
            </div>
          </div>
          //    </Link>
        );
      })}
    </div>
  );
}

export default Overview;
