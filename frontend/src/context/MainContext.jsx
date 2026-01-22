import React from 'react'
import { AuthContextProvider } from './AuthContext'

const MainContext = ({ children }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}

export default MainContext