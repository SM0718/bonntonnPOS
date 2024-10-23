import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import UploadProduct from './pages/UploadProduct'

function App() {
  return (
    <>
    <div className='flex'>
      <Header />
      <Outlet />
    </div>
      
    </>
    
  )
}

export default App