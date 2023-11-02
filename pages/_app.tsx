import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "next-themes"
import Header from "@/components/molecules/header";
import CommandMenuProvider from "@/utils/command-menu-provider";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {SessionProvider} from "next-auth/react";
import {SasProvider} from "@/utils/SasContext";

export default function App({
                              Component, pageProps: { session, ...pageProps }
                            }: AppProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login';

  const containerClassnames = classNames({"container mt-5 mb-5": !isLoginPage})

  return <SessionProvider session={session}>
      <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
    <SasProvider>
      <CommandMenuProvider>
        <div className="relative flex min-h-screen flex-col">
          <Header/>
          <div className={containerClassnames}>
            <Component {...pageProps} />
          </div>
        </div>
      </CommandMenuProvider>
    </SasProvider>
  </ThemeProvider>
  </SessionProvider>
}
