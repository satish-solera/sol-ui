"use client";


import * as React from "react"

// import { Check, Copy, Terminal, Atom } from "lucide-react"

// import { Highlight, themes, PrismTheme } from "prism-react-renderer"
import { motion } from "framer-motion"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils/cn";
import { IconAtom, IconCheck, IconCopy, IconTerminal } from "@tabler/icons-react";

// Custom themes to match CLICommand colors exactly
// const vibrantLightTheme: PrismTheme = {
//     plain: {
//         color: "#525252", // neutral-600
//         backgroundColor: "transparent",
//     },
//     styles: [
//         {
//             types: ["comment", "prolog", "doctype", "cdata"],
//             style: { color: "#a3a3a3" }, // neutral-400
//         },
//         {
//             types: ["punctuation", "operator"],
//             style: { color: "#525252" }, // neutral-600
//         },
//         {
//             types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"],
//             style: { color: "#0ea5e9" }, // sky-500
//         },
//         {
//             types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
//             style: { color: "#d97706" }, // amber-600
//         },
//         {
//             types: ["url", "variable", "function", "class-name"],
//             style: { color: "#0ea5e9" }, // sky-500
//         },
//         {
//             types: ["atrule", "attr-value", "keyword"],
//             style: { color: "#d946ef" }, // fuchsia-500
//         },
//         {
//             types: ["regex", "important"],
//             style: { color: "#ef4444" }, // red-500
//         },
//     ],
// }

// const vibrantDarkTheme: PrismTheme = {
//     plain: {
//         color: "#22c55e", // green-500 (Darker, richer green)
//         backgroundColor: "transparent",
//     },
//     styles: [
//         {
//             types: ["comment", "prolog", "doctype", "cdata"],
//             style: { color: "#525252" }, // neutral-600 (Darker comment)
//         },
//         {
//             types: ["punctuation", "operator"],
//             style: { color: "#737373" }, // neutral-500 (Darker punctuation)
//         },
//         {
//             types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"],
//             style: { color: "#38bdf8" }, // sky-400
//         },
//         {
//             types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
//             style: { color: "#fbbf24" }, // amber-400 (Strings like URL)
//         },
//         {
//             types: ["url", "variable", "function", "class-name"],
//             style: { color: "#38bdf8" }, // sky-400
//         },
//         {
//             types: ["atrule", "attr-value", "keyword"],
//             style: { color: "#e879f9" }, // fuchsia-400
//         },
//         {
//             types: ["regex", "important"],
//             style: { color: "#f87171" }, // red-400
//         },
//     ],
// }

function useCopy() {
    const [hasCopied, setHasCopied] = React.useState(false)

    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    return { hasCopied, copy }
}

interface CodeBlockProps {
    code: string
    language?: string
    className?: string
    expandable?: boolean
    title?: string
    hideCopy?: boolean
    nested?: boolean // New prop
}

export function CodeBlock({ code, language = "bash", className, expandable = false, title, hideCopy, nested }: CodeBlockProps) {

    const { hasCopied, copy } = useCopy()
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    // Use light theme by default on server/initial render to prevent hydration mismatch
    // const currentTheme = isMounted ? (resolvedTheme === 'dark' ? vibrantDarkTheme : vibrantLightTheme) : vibrantLightTheme

    // Manual highlighting for bash if Prism fails being vibrant enough
    // This simple hack ensures 'npm install' gets colored if it's plain text
    // (Note: Prism usually does a good job if the language is correct, but let's trust the theme first)

    return (
        <div className={cn(
            "relative group/code overflow-hidden",
            // Adaptable styling: Light Mode (Standard) vs Dark Mode (Pitch Black)
            nested
                ? "border-0 bg-transparent p-0 m-0 shadow-none !rounded-none"
                : "rounded-xl !border-[1px] !border-neutral-200 dark:!border-neutral-900 bg-neutral-100 dark:bg-black shadow-sm mb-4",
            className
        )}>
            {hideCopy ? null : title ? (
                <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-300 dark:border-neutral-900 bg-white dark:bg-black rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 fill-emerald-500 rotate-180"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>
                        <span className="text-sm text-neutral-700 dark:text-neutral-400 font-medium">{title}</span>
                    </div>
                    <button
                        onClick={() => copy(code)}
                        className="flex items-center justify-center w-7 h-7 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all"
                        aria-label="Copy code"
                    >
                        {hasCopied ? <IconCheck className="w-3.5 h-3.5 text-emerald-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            ) : hideCopy ? null : (
                <div className="absolute right-3 top-3 z-20 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => copy(code)}
                        className="flex items-center justify-center w-7 h-7 rounded-md bg-white/50 dark:bg-neutral-800/50 backdrop-blur-md border border-black/5 dark:border-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all active:scale-95"
                        aria-label="Copy code"
                    >
                        {hasCopied ? <IconCheck className="w-3.5 h-3.5 text-emerald-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            )}
            <div className={cn(
                "relative text-base font-mono leading-relaxed overflow-x-auto scrollbar-hide",
                !nested && "p-4",
                expandable && !isExpanded && "max-h-32 overflow-hidden",
            )}>
              
            </div>
            {expandable && !isExpanded && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-t from-neutral-100 via-neutral-100/40 to-transparent dark:from-[#161616] dark:via-[#161616]/40 dark:to-transparent pt-20">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="px-4 py-1.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 backdrop-blur-sm text-[12px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300/50 dark:border-neutral-700/50 shadow-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all hover:scale-105 active:scale-95"
                    >
                        Expand code
                    </button>
                </div>
            )}
            {expandable && isExpanded && (
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center z-10 pointer-events-none">
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="pointer-events-auto px-4 py-1.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 backdrop-blur-sm text-[12px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300/50 dark:border-neutral-700/50 shadow-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all hover:scale-105 active:scale-95"
                    >
                        Collapse
                    </button>
                </div>
            )}
        </div>
    )
}

interface DependenciesProps {
    step?: number
    title?: string
    children?: React.ReactNode
    copyText?: string
    id?: string
}

export const Dependencies = ({ step, title, children, copyText, id }: DependenciesProps) => {
    const { hasCopied, copy } = useCopy()
    const textToCopy = copyText ?? (typeof children === "string" ? children : "")

    const processedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CodeBlock) {
            // Pass nested={true} to remove borders/styles from inner block
            return React.cloneElement(child as React.ReactElement<any>, { hideCopy: true, nested: true })
        }
        return child
    })

    // Subtle Lucide icons instead of emojis
    const StepIcon = React.useMemo(() => {
        if (step === 1) return <IconTerminal className="w-3.5 h-3.5 text-fuchsia-500" /> // Install
        if (step === 2) return <IconAtom className="w-3.5 h-3.5 text-sky-500" /> // Utils
        if (step === 3) return <IconCopy className="w-3.5 h-3.5 text-amber-500" /> // Copy Code
        return <IconTerminal className="w-3.5 h-3.5 text-neutral-500" />
    }, [step])

    return (
        <div id={id} className="relative w-full !border-[1px] !border-neutral-200 dark:!border-neutral-700 rounded-xl overflow-hidden bg-neutral-100 dark:bg-[#161616] mb-6 scroll-mt-24">
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 ring-1 ring-neutral-200 dark:ring-neutral-700 font-mono text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                        {step}
                    </div>
                    {title && (
                        <h2 className="font-medium text-sm text-foreground flex items-center gap-2">
                            {StepIcon}
                            <span>{title}</span>
                        </h2>
                    )}
                </div>
                <button
                    onClick={() => copy(textToCopy)}
                    className="flex items-center justify-center w-7 h-7 rounded-md transition-colors text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    aria-label="Copy code"
                >
                    {hasCopied ? <IconCheck className="w-3.5 h-3.5 text-green-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                </button>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-[#161616] [&_.group\/code]:border-0 [&_.group\/code]:shadow-none [&_.group\/code]:bg-transparent [&_.group\/code]:mb-0 [&_.group\/code]:rounded-none">
                <div className="text-sm text-muted-foreground">{processedChildren}</div>
            </div>
        </div>
    )
}

interface ComponentInstallationProps {
    cli: string
    manual: React.ReactNode
    className?: string
}



export function ComponentInstallation({ cli, manual, className }: ComponentInstallationProps) {
    const [installType, setInstallType] = React.useState("npm")
    const { hasCopied, copy } = useCopy()

    const getCommand = () => {
        switch (installType) {
            case "pnpm": return cli.replace(/^npx/, 'pnpm dlx')
            case "bun": return cli.replace(/^npx/, 'bun x')
            case "yarn": return cli.replace(/^npx/, 'yarn dlx')
            default: return cli
        }
    }

    const copyCommand = () => {
        copy(getCommand())
    }

    return (
        <div className={cn("group relative my-8", className)}>
            <div className="mb-10" id="install-cli">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">Install using CLI</h2>
               
            </div>
            {manual && (
                <div className="space-y-3" id="install-manual">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Install Manually</h2>
                    {manual}
                </div>
            )}
        </div>
    )
}
