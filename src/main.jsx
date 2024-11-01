import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  UploadProduct,
  AllProducts,
  ProductAnalytics,
  Orders
} from './pages/index.js'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<ProductAnalytics />}/>
      <Route path='/product-upload' element={<UploadProduct />}/>
      <Route path='/all-products' element={<AllProducts />}/>
      <Route path='/orders' element={<Orders />}/>
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
       <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>,
)
