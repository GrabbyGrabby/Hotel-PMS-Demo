import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout(){ return (<div className="app"><Sidebar /><div className="container"><Header /><div className="page"><Outlet/></div></div></div>); }
