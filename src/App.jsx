import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Guests from "./pages/Guests";
import Housekeeping from "./pages/Housekeeping";
import Rates from "./pages/Rates";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import { read } from "./lib/store";
import "./lib/seed";

function RequireAuth({children}){
  const token = localStorage.getItem('auth_token');
  const loc = useLocation();
  if(!token) return <Navigate to="/login" state={{from:loc}} replace />;
  return children;
}

export default function App(){
  useEffect(()=>{
    const s = read('settings', {theme:'light'});
    if(s.theme==='dark') document.body.classList.add('dark'); else document.body.classList.remove('dark');
  },[]);
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<RequireAuth><Layout/></RequireAuth>}>
        <Route index element={<Dashboard/>} />
        <Route path="bookings" element={<Bookings/>} />
        <Route path="rooms" element={<Rooms/>} />
        <Route path="guests" element={<Guests/>} />
        <Route path="housekeeping" element={<Housekeeping/>} />
        <Route path="rates" element={<Rates/>} />
        <Route path="reports" element={<Reports/>} />
        <Route path="settings" element={<Settings/>} />
      </Route>
    </Routes>
  );
}
