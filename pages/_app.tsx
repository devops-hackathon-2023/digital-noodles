import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "next-themes"
import CommandMenuProvider from "@/utils/CommandMenuProvider";
import {SessionProvider} from "next-auth/react";
import {SasProvider} from "@/utils/SasContext";
import React from "react";
import {Toaster} from "@/components/ui/toaster";

export default function App({
                              Component,
                              pageProps: {
                                session,
                                ...pageProps
                              }
                            }: AppProps) {

  return <SessionProvider session={session}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <SasProvider>
        <CommandMenuProvider>
          <Component {...pageProps} />
        </CommandMenuProvider>
        <Toaster />
      </SasProvider>
    </ThemeProvider>
  </SessionProvider>
}