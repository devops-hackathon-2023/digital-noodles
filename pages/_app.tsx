import '@/styles/globals.css'
import type {AppProps} from 'next/app'

import {ThemeProvider} from "next-themes"
import Header from "@/components/molecules/header";
import CommandMenuProvider from "@/lib/command-menu-provider";

export default function App({
                              Component,
                              pageProps
                            }: AppProps) {
  return <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
    <CommandMenuProvider>
    <div className="relative flex min-h-screen flex-col">
      <Header/>
      <Component {...pageProps} />
    </div>
    </CommandMenuProvider>
  </ThemeProvider>
}
