import { useMDXComponents as getTheme } from "nextra-theme-docs";

const themeComponents = getTheme()

export function useMDXComponents(components){
    return{
        ...themeComponents,
        ...components
}
}