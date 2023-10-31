import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import {ThemeProvider} from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
    <Component {...pageProps} />
  </ThemeProvider>
}
