import React, { useState, useEffect } from "react";
import { Link, NavLink, Route, Routes } from "react-router";
import { useTheme } from "next-themes";

import Ilya from '@/assets/Ilya.jpg'


function Header() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    // only work at first-time loading
    useEffect(() => {
        if(theme === 'system') setTheme(resolvedTheme)
    }, []);

    return (
        
        <header className="header">
            <Link className="logo" to="/" ><img className="w-[5vh]" src={Ilya} alt="" /></Link>
            
            <div className="flex flex-col">
            <nav className="nav">
                <NavLink to="/" end>首頁</NavLink>
                |
                <NavLink to="/courses">課程</NavLink>
                |
                <NavLink to="/about">關於</NavLink>
                |
                <NavLink to="/contact">聯絡</NavLink>
                |
                <NavLink to="/FGOcalculator">期末project</NavLink>
            </nav>
            <button
                className="bg-secondary/50 hover:bg-secondary backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm transition-colors duration-500"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "dark" ? "☀️" : "🌙"}
            </button>
            </div>
        </header>
        // <header className="bg-foreground">
        //     <div className="">Web | <a href="https://www.google.com/">Images</a> | <a href="https://www.google.com/">Maps</a> | <a href="https://www.google.com/">News</a> | <a href="https://www.google.com/">Shopping</a> | <a href="https://www.google.com/">Gmail</a> | <a href="https://www.google.com/">more</a></div>
        //     <div>
        //         <button
        //             className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm transition-all hover:bg-secondary backdrop-blur-sm"
        //             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        //             >
        //             {theme === "dark" ? "darkTheme" : "lightTheme"}
        //         </button>
        //     </div>
        // </header>
    )
}


export default Header;