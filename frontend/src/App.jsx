import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'




const App = () => {
const [showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
     <Navbar setShowLogin={setShowLogin}/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Cart' element={<Cart/>}></Route>
      <Route path='/order' element={<PlaceOrder/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>
      <Route path='/myorders' element={<MyOrders/>}></Route>

     </Routes>
    </div>
    <Footer></Footer>
    </>
    
  )
}

export default App