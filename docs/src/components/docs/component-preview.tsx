"use client";

import React, { useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import { ComponentInstallation } from "./component-installation";
import { cn } from '@/lib/utils/cn';
import { motion } from 'motion/react';

interface ComponentPreviewProps {
    component: React.ReactNode;
    code: string;
    title?: string;
    className?: string;
    description?: string;
    installation?: {
        cli: string;
        manual: React.ReactNode;
    };
}

export function ComponentPreview({
    component,
    code,
    title,
    className,
    description,
    installation,
}: ComponentPreviewProps) {
    const [activeTab, setActiveTab] = useState("preview");
    const [hasCopied, setHasCopied] = useState(false);
    // const { resolvedTheme } = useTheme();
    const uniqueId = React.useId();

    const onCopy = () => {
        navigator.clipboard.writeText(code);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    const vibrantDarkTheme = {
        plain: {
            color: "#22c55e", // green-500
            backgroundColor: "transparent",
        },
        styles: [
            {
                types: ["comment", "prolog", "doctype", "cdata"],
                style: { color: "#525252" },
            },
            {
                types: ["punctuation", "operator"],
                style: { color: "#737373" },
            },
            {
                types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"],
                style: { color: "#38bdf8" }, // sky-400
            },
            {
                types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
                style: { color: "#fbbf24" }, // amber-400
            },
            {
                types: ["url", "variable", "function", "class-name"],
                style: { color: "#38bdf8" }, // sky-400
            },
            {
                types: ["atrule", "attr-value", "keyword"],
                style: { color: "#e879f9" }, // fuchsia-400
            },
            {
                types: ["regex", "important"],
                style: { color: "#f87171" }, // red-400
            },
        ],
    };

    // ... inside ComponentPreview ...

    return (
        <div className={cn("group relative my-8 flex flex-col space-y-4", className)}>
            <div className="flex flex-col space-y-1.5">
                {description && <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{description}</p>}
            </div>

          

            {installation && (
                <ComponentInstallation cli={installation.cli} manual={installation.manual} />
            )}
        </div>
    );
}
