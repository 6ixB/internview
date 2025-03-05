import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { ReactQueryProvider } from './ReactQuery'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
