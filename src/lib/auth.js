import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('lc_user')
      if(raw) setUser(JSON.parse(raw))
    }catch(e){}
  }, [])

  function login(name){
    const u = { name }
    setUser(u)
    localStorage.setItem('lc_user', JSON.stringify(u))
    setShowLogin(false)
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('lc_user')
  }

  return React.createElement(AuthContext.Provider, { value: { user, login, logout, showLogin, openLogin: ()=>setShowLogin(true), closeLogin: ()=>setShowLogin(false) } }, children)
}

export function useAuth(){
  return useContext(AuthContext)
}
