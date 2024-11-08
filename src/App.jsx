import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <div className='flex'>
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
      
    </>
    
  )
}

export default App