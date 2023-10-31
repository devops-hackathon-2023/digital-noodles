import '@/styles/globals.css'
import type {AppProps} from 'next/app'

import {ThemeProvider} from "next-themes"
import Header from "@/components/molecules/header";

export default function App({
                              Component,
                              pageProps
                            }: AppProps) {
  return <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
    <div className="relative flex min-h-screen flex-col">
      <Header/>
      <Component {...pageProps} />
    </div>
  </ThemeProvider>
}
