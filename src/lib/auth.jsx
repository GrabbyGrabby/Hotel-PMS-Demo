import React, { createContext, useContext, useEffect, useState } from "react";
import { read, write } from "./store";
const DEMO_USER = { username: "admin", password: "admin123", role: "admin" };
function fakeJWT(user){ return btoa(JSON.stringify({user:user.username, role:user.role, iat: Date.now()})); }
const AuthContext = createContext();
export function AuthProvider({children}){
  const [user, setUser] = useState(read('auth_user', null));
  useEffect(()=>{
    const token = localStorage.getItem('auth_token'); if(token && !user){ try{ const payload = JSON.parse(atob(token)); setUser({username:payload.user, role:payload.role}); }catch(e){} }
  },[]);
  function login({username,password}){
    if(username===DEMO_USER.username && password===DEMO_USER.password){ const token = fakeJWT(DEMO_USER); localStorage.setItem('auth_token', token); write('auth_user', {username:DEMO_USER.username, role:DEMO_USER.role}); setUser({username:DEMO_USER.username, role:DEMO_USER.role}); return {ok:true, token}; }
    return {ok:false, message:'Invalid credentials'};
  }
  function logout(){ localStorage.removeItem('auth_token'); localStorage.removeItem('auth_user'); setUser(null); }
  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
export function useAuth(){ return useContext(AuthContext); }
