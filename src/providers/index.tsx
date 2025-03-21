import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { ReactQueryProvider } from './ReactQuery'
import { AuthProvider } from './Auth'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </ThemeProvider>
      </AuthProvider>
    </ReactQueryProvider>
  )
}
