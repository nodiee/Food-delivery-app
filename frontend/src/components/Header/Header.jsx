import React from 'react'
import "./Header.css"
import { useState } from 'react';

const Header = () => {
  const [menu, setMenu] = useState();
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food</h2>
        <p>choose from a diverse menu</p>
        <button className="before-active1"
  onClick={() => {
    setMenu("menu");
    window.location.hash = "explore-menu"; // Navigates to #explore-menu
  }} 
  className={menu === "menu" ? "active" : ""}
>
  View Menu
</button>
      </div>
    </div>
  )
}

export default Header