"use client";
import { useRef , useEffect} from "react";
import { ResizableHandler, ResizablePanel, ResizablePanelGroup } from "../resizable"
import IframeRenderer from "./iframe-block-renderer"

import { PanelImperativeHandle} from "react-resizable-panels";

const BlockPreview = ({src , idx} : {src : string , idx : any}) =>{
    const resizablePanelRef = useRef<PanelImperativeHandle>(null);
    
//   useEffect(() => {
//     if (resizablePanelRef.current) {
//       resizablePanelRef.current.resize(blockScreen?.size || 100);
//     }
//   }, [selectedScreenSize]);
    return(
        <ResizablePanelGroup
                orientation="horizontal"
                className="relative z-10 after:absolute after:inset-0">
                  <ResizablePanel
                  className="relative  overflow-hidden"
                  defaultSize="100%"
                  minSize="30%"
                  
                  >
                        <IframeRenderer
                    id={idx}
                    // iframeRef={iframeRef}
                      isCached
                      src={`/view/components/${src}`}
                      title="abc"
                      />
                   
                  </ResizablePanel>
                  <ResizableHandler 
                  className="relative w-3  rounded-[min(var(--radius-2xl),24px)] after:absolute after:top-1/2"
                  />
                  <ResizablePanel defaultSize="0%" minSize="0%"/>
</ResizablePanelGroup>
    )
}

export default BlockPreview;